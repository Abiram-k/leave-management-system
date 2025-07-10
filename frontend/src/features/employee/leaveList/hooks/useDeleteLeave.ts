import { LeaveService } from "@/api/leave.service";
import { useState } from "react";
import { toast } from "sonner";

export const useDeleteLeave = () => {
  const [isLoading, setIsLoading] = useState(false);
  const leaveService = new LeaveService();

  const deleteLeave = async (leaveId: number): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await leaveService.deleteLeave(leaveId);
      console.log("Delete leave response: ", response);
    } catch (error: any) {
      toast.error(error?.message || "Failed to Delete leave!");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteLeave, isLoading };
};
