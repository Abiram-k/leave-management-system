import { ILeaveTypeRepository } from "../interfaces/repositories/leave.type.repository.interface";
import { ILeaveTypeService } from "../interfaces/services/leave.types.service.interface";
import { LeaveTypes } from "../types/leave.type";

export class LeaveTypeService implements ILeaveTypeService {
  constructor(private leaveTypeRepository: ILeaveTypeRepository) {}

  async getAllLeaveTypes(): Promise<LeaveTypes[]> {
    return await this.leaveTypeRepository.getAll();
  }

  async getLeaveTypeById(id: number): Promise<LeaveTypes | null> {
    return await this.leaveTypeRepository.getById(id);
  }

  async createLeaveType(data: Omit<LeaveTypes, "id">): Promise<void> {
    await this.leaveTypeRepository.create(data);
  }

  async updateLeaveType(
    id: number,
    data: Partial<Omit<LeaveTypes, "id">>
  ): Promise<void> {
    await this.leaveTypeRepository.update(id, data);
  }

  async deleteLeaveType(id: number): Promise<void> {
    await this.leaveTypeRepository.delete(id);
  }
}
