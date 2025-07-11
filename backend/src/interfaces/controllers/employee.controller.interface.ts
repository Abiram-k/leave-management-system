import { NextFunction, Request, Response } from "express";

export interface IEmployeeController {
  getAllEmployees(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  deleteEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  updateEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getEmployeeLeaves(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  addNewEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>
}
