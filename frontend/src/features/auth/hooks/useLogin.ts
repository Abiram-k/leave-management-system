import { AuthService } from "@/api/auth.service";
import type { LoginForm, Role } from "@/types/auth.type";
import type { ResponseType } from "@/types/response.type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogin = (role: Role) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const authService = new AuthService();

  const login = async (data: LoginForm): Promise<void> => {
    setIsLoading(true);
    try {
      const response: ResponseType & { accessToken: string } =
        await authService.login(role, data);
      toast.success(response.message || "Login success");
      console.log("Login response: ", response);
      localStorage.setItem("accessToken", response.accessToken);
      if (role == "admin") {
        navigate(`/${role}/dashboard`);
        return;
      }
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};
