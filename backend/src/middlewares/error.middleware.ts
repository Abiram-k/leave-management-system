import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app.error";
import { HttpStatusCode } from "../config/constants/httpStatusCode.enum";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode =
    err instanceof AppError
      ? typeof err.statusCode == "string"
        ? HttpStatusCode.INTERNAL_SERVER_ERROR
        : err.statusCode
      : HttpStatusCode.INTERNAL_SERVER_ERROR;

  console.log(err);
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};
