import { Login, Register } from "../../types/auth.type";

export interface IAuthService {
  refreshAccessToken(
    role: string,
    refreshToken: string
  ): Promise<string | null>;
  login(data: Login): Promise<{ accessToken: string; refreshToken: string }>;
  register(data: Register): Promise<void>;
}
