import { LeaveTypesService } from "@/api/leave.types.service";
import { useState } from "react";
import { toast } from "sonner";

export const useDeleteLeaveTypes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const leaveTypeService = new LeaveTypesService();

  const deleteLeave = async (leaveId: number): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await leaveTypeService.deleteLeaveType(leaveId);
      console.log("response: ", response);
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch leaves!");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteLeave, isLoading };
};
