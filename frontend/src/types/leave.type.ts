export type LeaveResType = {
  id: number;
  employee_id: number;
  leave_type_id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status?: LeaveStatus;
  created_at?: string;
};

export interface LeaveTypes {
  id: number;
  name: string;
  max_days: number;
}

export type LeaveStatus = "Pending" | "Approved" | "Rejected";
