import schedule
import time
from datetime import datetime

from train_predict import main


def run_job():
    print(f"[{datetime.now().isoformat()}] Weekly demand model retraining started")
    main()
    print(f"[{datetime.now().isoformat()}] Weekly demand model retraining finished")


if __name__ == "__main__":
    run_job()
    schedule.every().monday.at("02:00").do(run_job)
    print("ML scheduler is active. Retraining will run every Monday at 02:00.")
    while True:
        schedule.run_pending()
        time.sleep(60)
