import { Request, Response, NextFunction } from "express";
import { ILeaveService } from "../interfaces/services/leave.service.interface";
import { ILeaveController } from "../interfaces/controllers/leave.controller.interface";
import { AuthRequest } from "../types/auth.type";

export class LeaveController implements ILeaveController {
  private readonly _leaveService: ILeaveService;
  constructor(leaveService: ILeaveService) {
    this._leaveService = leaveService;
  }
  async AddNewLeave(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { userId: employee_id } = req.user;
      console.log("REQ.USER = ", req.user);
      const success = await this._leaveService.AddNewLeave(
        req.body,
        employee_id
      );
      res.status(201).json({ message: "Leave applied successfully", success });
    } catch (error) {
      next(error);
    }
  }
  async updateLeave(req: Request, res: Response, next: NextFunction) {
    try {
      const success = await this._leaveService.updateLeave(req.body);
      res.status(201).json({ message: "Leave applied successfully", success });
    } catch (error) {
      next(error);
    }
  }

  async getMyLeaves(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { userId: employee_id } = req.user;
      const { leaves, leaveTypes } = await this._leaveService.getMyLeaves(
        employee_id
      );
      res.json({
        message: "successfully fetched my leaves",
        sucess: true,
        leaves,
        leaveTypes,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLeaveById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const leave = await this._leaveService.getLeaveById(id);
      if (!leave) {
        res.status(404).json({ message: "Leave not found" });
        return;
      }
      res.json(leave);
    } catch (error) {
      next(error);
    }
  }

  async deleteLeave(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const success = await this._leaveService.deleteLeave(id);
      res.json({ message: "Leave deleted", success });
    } catch (error) {
      next(error);
    }
  }
}
