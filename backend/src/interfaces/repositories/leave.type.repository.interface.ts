import { LeaveTypes } from "../../types/leave.type";

export interface ILeaveTypeRepository {
  getAll(): Promise<LeaveTypes[]>;
  getById(id: number): Promise<LeaveTypes | null>;
  create(data: Omit<LeaveTypes, "id">): Promise<void>;
  update(id: number, data: Partial<Omit<LeaveTypes, "id">>): Promise<void>;
  delete(id: number): Promise<void>;
}
