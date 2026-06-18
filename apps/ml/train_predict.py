from __future__ import annotations

import os
from datetime import date, datetime, timedelta
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split

try:
    from xgboost import XGBRegressor
except Exception:  # keeps project usable even if xgboost wheel is unavailable on a machine
    XGBRegressor = None

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://cafe_user:cafe_pass@localhost:3307/smart_cafe_ai")
TOTAL_SEATS = int(os.getenv("CAFE_TOTAL_SEATS", "60"))
PREDICTION_DAYS = int(os.getenv("PREDICTION_DAYS", "14"))
MODEL_DIR = Path(__file__).parent / "models"
MODEL_DIR.mkdir(exist_ok=True)


def get_engine():
    url = DATABASE_URL.replace("mysql://", "mysql+pymysql://", 1)
    return create_engine(url, pool_pre_ping=True)


def load_booking_history(engine) -> pd.DataFrame:
    query = """
    SELECT DATE(date) AS booking_date, SUM(guests) AS guests, COUNT(*) AS bookings
    FROM Booking
    WHERE status IN ('PENDING', 'CONFIRMED', 'COMPLETED')
    GROUP BY DATE(date)
    ORDER BY booking_date ASC
    """
    df = pd.read_sql(query, engine)
    if df.empty:
        return synthetic_history()
    df["booking_date"] = pd.to_datetime(df["booking_date"])
    return df


def synthetic_history(days: int = 90) -> pd.DataFrame:
    today = pd.Timestamp.today().normalize()
    rows = []
    rng = np.random.default_rng(42)
    for i in range(days, 0, -1):
        day = today - pd.Timedelta(days=i)
        weekend_boost = 12 if day.dayofweek in [4, 5, 6] else 0
        base = 18 + weekend_boost + int(rng.normal(0, 4))
        guests = max(6, base)
        bookings = max(2, round(guests / 2.4))
        rows.append({"booking_date": day, "guests": guests, "bookings": bookings})
    return pd.DataFrame(rows)


def add_features(df: pd.DataFrame) -> pd.DataFrame:
    data = df.copy()
    data["booking_date"] = pd.to_datetime(data["booking_date"])
    data["day_of_week"] = data["booking_date"].dt.dayofweek
    data["month"] = data["booking_date"].dt.month
    data["day"] = data["booking_date"].dt.day
    data["is_weekend"] = data["day_of_week"].isin([4, 5, 6]).astype(int)
    data["rolling_7_guests"] = data["guests"].rolling(7, min_periods=1).mean()
    data["rolling_14_guests"] = data["guests"].rolling(14, min_periods=1).mean()
    return data


def make_future(history: pd.DataFrame, days: int) -> pd.DataFrame:
    last_date = max(pd.Timestamp.today().normalize(), history["booking_date"].max())
    future_dates = [last_date + pd.Timedelta(days=i) for i in range(1, days + 1)]
    rolling_7 = history["guests"].tail(7).mean()
    rolling_14 = history["guests"].tail(14).mean()
    future = pd.DataFrame({"booking_date": future_dates})
    future["guests"] = rolling_7
    future["bookings"] = history["bookings"].tail(7).mean()
    future = add_features(future)
    future["rolling_7_guests"] = rolling_7
    future["rolling_14_guests"] = rolling_14
    return future


def train_model(featured: pd.DataFrame):
    feature_cols = ["day_of_week", "month", "day", "is_weekend", "rolling_7_guests", "rolling_14_guests"]
    X = featured[feature_cols]
    y = featured["guests"]

    if len(featured) >= 30:
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)
    else:
        X_train, X_test, y_train, y_test = X, X, y, y

    if XGBRegressor:
        model = XGBRegressor(
            n_estimators=160,
            max_depth=3,
            learning_rate=0.08,
            subsample=0.9,
            colsample_bytree=0.9,
            objective="reg:squarederror",
            random_state=42
        )
        model_name = "xgboost-v1"
    else:
        model = RandomForestRegressor(n_estimators=180, random_state=42, min_samples_leaf=2)
        model_name = "random-forest-v1"

    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    mae = float(mean_absolute_error(y_test, predictions)) if len(X_test) else 0.0
    confidence = max(0.55, min(0.95, 1 - (mae / max(float(y.mean()), 1.0))))
    joblib.dump(model, MODEL_DIR / "demand_model.joblib")
    return model, model_name, confidence


def write_predictions(engine, future: pd.DataFrame, predicted_guests: np.ndarray, model_name: str, confidence: float):
    now = datetime.utcnow()
    with engine.begin() as conn:
        for row, guests in zip(future.to_dict("records"), predicted_guests):
            expected_guests = max(1, int(round(float(guests))))
            expected_occupancy = max(1, min(100, int(round(expected_guests / TOTAL_SEATS * 100))))
            expected_bookings = max(1, int(round(expected_guests / 2.4)))
            target_date = pd.Timestamp(row["booking_date"]).to_pydatetime().replace(hour=0, minute=0, second=0, microsecond=0)
            notes = f"Predicted {expected_occupancy}% seat occupancy from historical booking pattern. Prepare staff, ingredients and seating accordingly."
            conn.execute(
                text(
                    """
                    INSERT INTO DemandPrediction
                    (id, targetDate, expectedOccupancy, expectedBookings, confidence, modelVersion, notes, createdAt)
                    VALUES
                    (:id, :targetDate, :expectedOccupancy, :expectedBookings, :confidence, :modelVersion, :notes, :createdAt)
                    ON DUPLICATE KEY UPDATE
                      expectedOccupancy = VALUES(expectedOccupancy),
                      expectedBookings = VALUES(expectedBookings),
                      confidence = VALUES(confidence),
                      modelVersion = VALUES(modelVersion),
                      notes = VALUES(notes),
                      createdAt = VALUES(createdAt)
                    """
                ),
                {
                    "id": f"ml_{target_date.strftime('%Y%m%d')}",
                    "targetDate": target_date,
                    "expectedOccupancy": expected_occupancy,
                    "expectedBookings": expected_bookings,
                    "confidence": round(confidence, 3),
                    "modelVersion": model_name,
                    "notes": notes,
                    "createdAt": now,
                },
            )


def main():
    engine = get_engine()
    history = load_booking_history(engine)
    featured = add_features(history)
    model, model_name, confidence = train_model(featured)
    future = make_future(history, PREDICTION_DAYS)
    feature_cols = ["day_of_week", "month", "day", "is_weekend", "rolling_7_guests", "rolling_14_guests"]
    predicted_guests = model.predict(future[feature_cols])
    write_predictions(engine, future, predicted_guests, model_name, confidence)
    print(f"Demand predictions saved for {PREDICTION_DAYS} days using {model_name}. Confidence: {confidence:.2f}")


if __name__ == "__main__":
    main()
