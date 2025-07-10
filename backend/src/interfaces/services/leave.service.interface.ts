import { leaveReqType } from "../../dtos/leave.dto";
import { LeaveTypes } from "../../schema/leave.types.schema";
import { LeaveData } from "../../types/leave.type";

export interface ILeaveService {
  updateLeave(data: leaveReqType): Promise<boolean>;
  AddNewLeave(data: leaveReqType, employee_id: number): Promise<boolean>;
  getMyLeaves(
    employee_id: number
  ): Promise<{ leaves: LeaveData[]; leaveTypes: LeaveTypes[] }>;
  getLeaveById(id: number): Promise<LeaveData | null>;
  deleteLeave(id: number): Promise<boolean>;
}
