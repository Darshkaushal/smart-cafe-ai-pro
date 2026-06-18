import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../lib/http.js";
import { env } from "../lib/env.js";

export type AuthRequest = Request & { admin?: { id: string; email: string } };

export function signAdminToken(payload: { id: string; email: string }) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}

export function requireAdmin(req: AuthRequest, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!token) return next(new ApiError(401, "Admin authorization token is required."));

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; email: string };
    req.admin = { id: decoded.id, email: decoded.email };
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired admin token."));
  }
}
