import { LeaveService } from "@/api/leave.service";
import { useState } from "react";
import { toast } from "sonner";

export const useFetchLeaves = () => {
  const [isLoading, setIsLoading] = useState(false);
  const leaveService = new LeaveService();

  const fetchLeaves = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await leaveService.getMyLeaves();
      console.log("My leaves response: ", response);
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch leaves!");
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchLeaves, isLoading };
};
