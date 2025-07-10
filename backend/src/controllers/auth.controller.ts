import { NextFunction, Request, Response } from "express";
import { IAuthController } from "../interfaces/controllers/auth.controller.interface";
import { HttpStatusCode } from "../config/constants/httpStatusCode.enum";
import { AppError } from "../utils/app.error";
import { IAuthService } from "../interfaces/services/auth.service.interface";
import { config } from "dotenv";
config();

export class AuthController implements IAuthController {
  private readonly _authService: IAuthService;
  constructor(authService: IAuthService) {
    this._authService = authService;
  }

  async refreshAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { role } = req.query;

      console.log("REFERSHING ACCESS TOKEN");
      
      const refreshToken = req.cookies[`${role}RefreshToken`];

      if (!refreshToken) {
        throw new AppError("Unauthorized", HttpStatusCode.UNAUTHORIZED);
      }

      const newAccessToken = await this._authService.refreshAccessToken(
        String(role),
        refreshToken
      );

      if (!newAccessToken) {
        console.log("Failed to generate new access Token.");
        return;
      }

      res.status(HttpStatusCode.OK).json({
        success: true,
        accessToken: newAccessToken,
        message: "Access token sended successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, role } = req.body;
      // console.log("Email: ", email, "Password: ", password, "Role: ", role);
      if (!email || !password || !role)
        throw new AppError(
          "Email, password and role are required",
          HttpStatusCode.BAD_REQUEST
        );

      const { accessToken, refreshToken } = await this._authService.login({
        email,
        password,
        role,
      });

      res.cookie(`${role}RefreshToken`, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod",
        sameSite: process.env.NODE_ENV === "prod" ? "none" : "strict",
        domain: process.env.FRONTEND_DOMAIN,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      res.json({ success: true, accessToken, message: "Login success!" });
    } catch (error) {
      console.log("Error while login user: ", error);
      next(error);
    }
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password } = req.body;
      // console.log("Name: ", name, "Email: ", email, "Password: ", password);

      if (!name || !email || !password) throw new Error("Credential missing!");

      await this._authService.register({ name, email, password });
      res
        .status(HttpStatusCode.OK)
        .json({ message: "User registered successfully", success: true });
      return;
    } catch (error) {
      console.log("Error while registering user: ", error);
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { role } = req.body;
      // console.log(role);
      if (!role) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "Role is required" });
        return;
      }

      res.clearCookie(`${role}RefreshToken`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod",
        sameSite: process.env.NODE_ENV === "prod" ? "none" : "strict",
        domain: process.env.FRONTEND_DOMAIN,
        path: "/",
      });

      res.json({ success: true, message: "successfully logged out" });
    } catch (error) {
      console.error("Logout Error: ", error);
      next(error);
    }
  }
}
