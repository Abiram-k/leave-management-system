import { NextFunction, Request, Response } from "express";
import { ILeaveTypeService } from "../interfaces/services/leave.types.service.interface";
import { ILeaveTypeController } from "../interfaces/controllers/leave.types.controller.interface";
import { HttpStatusCode } from "../config/constants/httpStatusCode.enum";
import { AppError } from "../utils/app.error";

export class LeaveTypeController implements ILeaveTypeController {
  constructor(private leaveTypeService: ILeaveTypeService) {}

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await this.leaveTypeService.getAllLeaveTypes();
      res
        .status(HttpStatusCode.OK)
        .json({ message: "Fetch success", success: true, leaveTypes: data });
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.leaveTypeService.createLeaveType(req.body);
      res
        .status(201)
        .json({ success: true, message: "Leave type created successfully" });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.leaveId);
      await this.leaveTypeService.updateLeaveType(id, req.body);
      res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Leave type updated successfully" });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.leaveId);
      await this.leaveTypeService.deleteLeaveType(id);
      res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Leave type deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}
