import { AuthService } from "@/api/auth.service";
import type { LoginForm, Role } from "@/types/auth.type";
import type { ResponseType } from "@/types/response.type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogout = (role: Role) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const authService = new AuthService();

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout(role);

      if (role == "admin") {
        navigate(`/${role}/auth/login`);
        return;
      }
      localStorage.removeItem("access_token");

      navigate("/auth/login");
    } catch (error: any) {
      toast.error(error?.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};
