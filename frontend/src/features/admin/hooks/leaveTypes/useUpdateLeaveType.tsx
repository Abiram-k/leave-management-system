import { LeaveTypesService } from "@/api/leave.types.service";
import type { LeaveTypes } from "@/types/leave.type";
import type { ResponseType } from "@/types/response.type";
import { useState } from "react";
import { toast } from "sonner";

export const useUpdateLeaveTypes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const leaveTypeService = new LeaveTypesService();

  const updateLeave = async (
    leaveId: number,
    data: Omit<LeaveTypes, "id">
  ): Promise<ResponseType | undefined> => {
    setIsLoading(true);
    try {
      const response = await leaveTypeService.updateLeaveType(leaveId, data);
      console.log("response: ", response);
      return response;
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch leaves!");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateLeave, isLoading };
};
