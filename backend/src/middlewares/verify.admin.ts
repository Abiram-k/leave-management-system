import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../config/constants/httpStatusCode.enum";
import { AuthRequest } from "../types/auth.type";
import { AppError } from "../utils/app.error";

export const verifyAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const { user } = req;

  if (!user) {
    return next(
      new AppError(
        "Access Denied: No user information found",
        HttpStatusCode.UNAUTHORIZED
      )
    );
  }

  if (user.role !== "admin") {
    console.warn("Access Denied: Unauthorized role");
    return next(
      new AppError("Access Denied: Admins only", HttpStatusCode.FORBIDDEN)
    );
  }
  next();
};
