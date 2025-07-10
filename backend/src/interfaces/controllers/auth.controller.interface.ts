import { NextFunction, Request, Response } from "express";

export interface IAuthController {
  refreshAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  logout(req: Request, res: Response, next: NextFunction): Promise<void>;
}
