import { HttpStatusCode } from "../config/constants/httpStatusCode.enum";
import { DecodedToken } from "../types/auth.type";
import { AppError } from "./app.error";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET as string;

export const generateAccessToken = (data: DecodedToken): string => {
  if (!ACCESS_TOKEN) {
    throw new AppError("Unauthorized", HttpStatusCode.UNAUTHORIZED);
  }

  const accessToken = jwt.sign(data, ACCESS_TOKEN, { expiresIn: "15m" });
  return accessToken;
};

export const generateRefreshToken = (data: DecodedToken): string => {
  if (!REFRESH_TOKEN) {
    throw new AppError("Unauthorized", HttpStatusCode.UNAUTHORIZED);
  }
  const refreshToken = jwt.sign(data, REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  return refreshToken;
};
