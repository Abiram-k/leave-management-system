import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpStatusCode } from "../config/constants/httpStatusCode.enum";
import { config } from "dotenv";
import { AppError } from "../utils/app.error";
import { AuthRequest, DecodedToken } from "../types/auth.type";

config();

export const verifyEmployee = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new AppError(
          "Authorization header missing or invalid",
          HttpStatusCode.UNAUTHORIZED
        )
      );
    }

    const token = authHeader.split(" ")[1];
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

    if (!ACCESS_TOKEN_SECRET) {
      return next(
        new AppError(
          "Access token secret not configured",
          HttpStatusCode.INTERNAL_SERVER_ERROR
        )
      );
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as DecodedToken;

    if (!decoded.userId || !decoded.role) {
      return next(
        new AppError("Invalid token payload", HttpStatusCode.UNAUTHORIZED)
      );
    }

    req.user = decoded;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Token expired" });
      return;
    }

    return next(
      new AppError("Invalid or malformed token", HttpStatusCode.UNAUTHORIZED)
    );
  }
};
