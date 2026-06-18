import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../lib/http.js";

export function notFound(req: Request, _res: Response, next: NextFunction) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    return res.status(400).json({ success: false, message: "Validation failed.", details: error.flatten() });
  }

  if (error instanceof ApiError) {
    return res.status(error.status).json({ success: false, message: error.message, details: error.details });
  }

  console.error(error);
  return res.status(500).json({ success: false, message: "Internal server error." });
}
