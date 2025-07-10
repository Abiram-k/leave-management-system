import { LeaveService } from "@/api/leave.service";
import type { LeaveFormField } from "@/types/form.type";
import { useState } from "react";
import { toast } from "sonner";

export const useUpdateLeave = () => {
  const [isLoading, setIsLoading] = useState(false);
  const leaveService = new LeaveService();

  const updateLeave = async (leaveData: LeaveFormField): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await leaveService.updateLeave(leaveData);
      console.log("Update leave response: ", response);
    } catch (error: any) {
      toast.error(error?.message || "Failed to update leave!");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateLeave, isLoading };
};
