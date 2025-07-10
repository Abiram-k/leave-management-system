import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type Login = {
  email: string;
  password: string;
  role: string;
};
export type Register = {
  email: string;
  password: string;
  name: string;
};

export interface DecodedToken extends JwtPayload {
  userId: number;
  role: string;
}

export interface AuthRequest extends Request {
  user?: DecodedToken;
}
