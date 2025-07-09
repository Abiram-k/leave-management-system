import { Request, Response } from "express";
import { IAuthController } from "../interfaces/controllers/auth.controller.interface";
import { HttpStatusCode } from "../config/constants/httpStatusCode.enum";
import { AppError } from "../utils/app.error";

export class AuthController implements IAuthController {
  login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log("Email: ", email, "Password: ", password);
    } catch (error) {
      console.log("Error while login user: ", error);
      throw new AppError(
        "Error occured while login user",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  register(req: Request, res: Response) {
    try {
      const { name, email, department, password } = req.body;
      console.log("Name: ", name, "Email: ", email, "Password: ", password);
    } catch (error) {
      console.log("Error while registering user: ", error);
      throw new AppError(
        "Error occured while registering user",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
