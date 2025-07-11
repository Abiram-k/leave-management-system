import { RowDataPacket } from "mysql2";

export interface LeaveData extends RowDataPacket {
  id?: number;
  employee_id: number;
  leave_type_id: number;
  start_date: string;
  end_date: string;
  reason: string;
  status?: "Pending" | "Approved" | "Rejected";
  created_at?: string;
}
export interface LeaveTypes extends RowDataPacket {
  id: number;
  name: string;
  max_days: number;
}
