export interface LeaveData {
  id?: number;
  employee_id: number;
  leave_type_id: number;
  start_date: string;
  end_date: string;
  reason: string;
  status?: "Pending" | "Approved" | "Rejected";
  created_at?: string;
}





