import { EmployeeService } from "@/api/employee.service";
import type { LeaveStatus } from "@/types/leave.type";
import { useState } from "react";
import { toast } from "sonner";

export const useChangeLeaveStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const leaveService = new EmployeeService();

  const changLeaveStatus = async (
    emp_id: number,
    status: LeaveStatus
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await leaveService.changLeaveStatus(emp_id, status);
      console.log("response: ", response);
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch leaves!");
    } finally {
      setIsLoading(false);
    }
  };

  return { changLeaveStatus, isLoading };
};
