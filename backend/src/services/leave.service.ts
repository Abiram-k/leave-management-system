import { HttpStatusCode } from "../config/constants/httpStatusCode.enum";
import { leaveReqType } from "../dtos/leave.dto";
import { ILeaveRepository } from "../interfaces/repositories/leave.repository.interface";
import { ILeaveService } from "../interfaces/services/leave.service.interface";
import { LeaveTypes } from "../schema/leave.types.schema";
import { LeaveData } from "../types/leave.type";
import { AppError } from "../utils/app.error";

export class LeaveService implements ILeaveService {
  private readonly _leaveRepo: ILeaveRepository;
  constructor(leaveRepo: ILeaveRepository) {
    this._leaveRepo = leaveRepo;
  }

  async AddNewLeave(data: leaveReqType, employee_id: number): Promise<boolean> {
    if (new Date(data.endDate) < new Date(data.startDate)) {
      throw new AppError(
        "End date must be after start date",
        HttpStatusCode.BAD_REQUEST
      );
    }
    return await this._leaveRepo.create(data, employee_id);
  }
  async updateLeave(data: leaveReqType): Promise<boolean> {
    if (new Date(data.endDate) < new Date(data.startDate)) {
      throw new AppError(
        "End date must be after start date",
        HttpStatusCode.BAD_REQUEST
      );
    }
    // return await this._leaveRepo.create(data);
    return false;
  }

  async getMyLeaves(
    employee_id: number
  ): Promise<{ leaves: LeaveData[]; leaveTypes: LeaveTypes[] }> {
    const leaves = await this._leaveRepo.findAll(employee_id);
    const leaveTypes = await this._leaveRepo.getLeaveTypes();
    return { leaves, leaveTypes };
  }

  async getLeaveById(id: number): Promise<LeaveData | null> {
    return await this._leaveRepo.findById(id);
  }

  async deleteLeave(id: number): Promise<boolean> {
    const found = await this._leaveRepo.findById(id);
    if (!found) {
      throw new AppError("Leave request not found", HttpStatusCode.NOT_FOUND);
    }

    if (found.status !== "Pending") {
      throw new AppError(
        "Only pending requests can be deleted",
        HttpStatusCode.BAD_REQUEST
      );
    }

    return await this._leaveRepo.delete(id);
  }
}
