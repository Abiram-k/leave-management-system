import { HttpStatusCode } from "../config/constants/httpStatusCode.enum";
import { IAuthService } from "../interfaces/services/auth.service.interface";
import { DecodedToken, Login, Register } from "../types/auth.type";
import { AppError } from "../utils/app.error";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generate.tokens";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { IEmployeeRepository } from "../interfaces/repositories/employee.repository.interface";
import bcrypt from "bcrypt";
config();

const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET as string;

export class AuthService implements IAuthService {
  private readonly _employeeRepo: IEmployeeRepository;
  constructor(employeeRepo: IEmployeeRepository) {
    this._employeeRepo = employeeRepo;
  }

  async refreshAccessToken(
    role: string,
    refreshToken: string
  ): Promise<string | null> {
    try {
      if (!refreshToken)
        throw new AppError("Unauthorized", HttpStatusCode.UNAUTHORIZED);

      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN) as DecodedToken;

      if (!decoded)
        throw new AppError(
          "Invalid refresh token",
          HttpStatusCode.UNAUTHORIZED
        );

      const accessToken = generateAccessToken({
        role: decoded.role,
        userId: decoded.userId,
      });

      return accessToken;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Failed to refresh token");
    }
  }

  async login(
    data: Login
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const user = await this._employeeRepo.findByEmail(data.email);
      if (!user)
        throw new AppError(
          "Email id not registered!",
          HttpStatusCode.BAD_REQUEST
        );
      if (user && user.role != data.role) {
        throw new AppError(
          "Can't login here, go to admin login!",
          HttpStatusCode.BAD_REQUEST
        );
      }

      const match = await bcrypt.compare(data.password, user.password);
      if (!match)
        throw new AppError("Password is incorrect", HttpStatusCode.BAD_REQUEST);

      const payload: DecodedToken = { role: user.role, userId: user.id };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        "Error occured while login!",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async register(data: Register): Promise<void> {
    try {
      const existing = await this._employeeRepo.findByEmail(data.email);
      if (existing) throw new AppError("Email already registered");

      const hashed = await bcrypt.hash(data.password, 10);
      await this._employeeRepo.create({
        ...data,
        password: hashed,
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Error occured while creating new employee!");
    }
  }
}
