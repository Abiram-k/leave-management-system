import { LeaveService } from "@/api/leave.service";
import { useState } from "react";
import { toast } from "sonner";

export const useGetSelectedLeave = () => {
  const [isLoading, setIsLoading] = useState(false);
  const leaveService = new LeaveService();

  const getSelectedLeave = async (leaveId: number): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await leaveService.deleteLeave(leaveId);
      console.log("Selected leave response: ", response);
    } catch (error: any) {
      toast.error(error?.message || "Failed to Fetch leave!");
    } finally {
      setIsLoading(false);
    }
  };

  return { getSelectedLeave, isLoading };
};
