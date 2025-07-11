import { useState } from "react";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
import type { RegisterForm, Role } from "@/types/auth.type";
import type { ResponseType } from "@/types/response.type";
import { AuthService } from "@/api/auth.service";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const authService = new AuthService();

  const register = async (data: RegisterForm): Promise<void> => {
    setIsLoading(true);
    try {
      const response: ResponseType = await authService.register(data);
      toast.success(
        `${response.message ? response.message : "Registered successfully"}`
      );
      navigate("/auth/login");
    } catch (error: any) {
      toast.error(error?.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
};
