import { LeaveService } from "@/api/leave.service";
import type { LeaveFormField } from "@/types/form.type";
import { useState } from "react";
import { toast } from "sonner";

export const useAddLeave = () => {
  const [isLoading, setIsLoading] = useState(false);
  const leaveService = new LeaveService();

  const addLeave = async (leaveData: LeaveFormField): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await leaveService.addLeave(leaveData);
      console.log("Add leave response: ", response);
    } catch (error: any) {
      toast.error(error?.message || "Failed to add leave!");
    } finally {
      setIsLoading(false);
    }
  };

  return { addLeave, isLoading };
};
