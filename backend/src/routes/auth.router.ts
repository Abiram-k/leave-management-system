import { Router } from "express";
import { validateDto } from "../middlewares/validate.middleware";
import { LoginDto } from "../dtos/login.dto";
import { authController } from "../config/di";
import { RegisterDto } from "../dtos/register.dto";

const router = Router();

router.post(
  "/login",
  validateDto(LoginDto),
  authController.login.bind(authController)
);
router.post(
  "/register",
  validateDto(RegisterDto),
  authController.register.bind(authController)
);
router.get(
  "/refresh-token",
  authController.refreshAccessToken.bind(authController)
);
router.post("/logout", authController.logout.bind(authController));

export default router;
