import type { LoginForm, RegisterForm, Role } from "@/types/auth.type";
import { axiosInstancePublic } from "./api.service";
import type { ResponseType } from "@/types/response.type";

export class AuthService {
  async login(
    role: Role,
    data: LoginForm
  ): Promise<ResponseType & { accessToken: string }> {
    try {
      const response = await axiosInstancePublic.post("/auth/login", {
        role,
        ...data,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.isAxiosError) {
        throw new Error(error.response?.data.message || "Something went wrong");
      } else {
        throw new Error(error.message || "Something went wrong");
      }
    }
  }

  async logout(role: Role): Promise<ResponseType> {
    try {
      const response = await axiosInstancePublic.post("/auth/logout", {role});
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.isAxiosError) {
        throw new Error(error.response?.data.message || "Something went wrong");
      } else {
        throw new Error(error.message || "Something went wrong");
      }
    }
  }
  async register(data: RegisterForm): Promise<ResponseType> {
    try {
      const response = await axiosInstancePublic.post("/auth/register", data);
      return response.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        throw new Error(error.response?.data.message || "Something went wrong");
      } else {
        throw new Error(error.message || "Something went wrong");
      }
    }
  }
}
