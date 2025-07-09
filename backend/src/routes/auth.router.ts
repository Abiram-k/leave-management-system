import { Router } from "express";
import { validateDto } from "../middlewares/validate.middleware";
import { LoginDto } from "../dtos/auth/login.dto";
import { authController } from "../config/di";
import { RegisterDto } from "../dtos/auth/register.dto";

const router = Router();

router.post(
  "/login",
  validateDto(LoginDto),
  authController.login.bind(authController.login)
);
router.post(
  "/register",
  validateDto(RegisterDto),
  authController.register.bind(authController.register)
);

export default router;
