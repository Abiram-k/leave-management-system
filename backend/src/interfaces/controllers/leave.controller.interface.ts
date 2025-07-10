import { Request, Response, NextFunction } from "express";

export interface ILeaveController {
  AddNewLeave(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateLeave(req: Request, res: Response, next: NextFunction): Promise<void>;
  getMyLeaves(req: Request, res: Response, next: NextFunction): Promise<void>;
  getLeaveById(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteLeave(req: Request, res: Response, next: NextFunction): Promise<void>;
}
