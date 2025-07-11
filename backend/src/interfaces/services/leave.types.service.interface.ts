import { LeaveTypes } from "../../types/leave.type";

export interface ILeaveTypeService {
  getAllLeaveTypes(): Promise<LeaveTypes[]>;
  getLeaveTypeById(id: number): Promise<LeaveTypes | null>;
  createLeaveType(data: Omit<LeaveTypes, "id">): Promise<void>;
  updateLeaveType(
    id: number,
    data: Partial<Omit<LeaveTypes, "id">>
  ): Promise<void>;
  deleteLeaveType(id: number): Promise<void>;
}
