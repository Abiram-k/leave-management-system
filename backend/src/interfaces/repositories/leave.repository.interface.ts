import { leaveReqType } from "../../dtos/leave.dto";
import { LeaveTypes } from "../../schema/leave.types.schema";
import { LeaveData } from "../../types/leave.type";

export interface ILeaveRepository {
  create(data: leaveReqType, employee_id: number): Promise<boolean>;
  findById(id: number): Promise<LeaveData | null>;
  updateLeave(data: Partial<leaveReqType>): Promise<boolean>;
  findMyLeaves(employee_id: number): Promise<LeaveData[]>;
  findAll(employee_id: number): Promise<LeaveData[]>;
  delete(id: number): Promise<boolean>;
  getLeaveTypes(): Promise<LeaveTypes[]>;
}
