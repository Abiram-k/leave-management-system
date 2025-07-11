import {
  LeaveTypesService,
  type GetLeaveTypes,
} from "@/api/leave.types.service";
import { useState } from "react";
import { toast } from "sonner";

export const useFetchLeaveTypes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const leaveTypeService = new LeaveTypesService();

  const fetchLeaves = async (): Promise<GetLeaveTypes | undefined> => {
    setIsLoading(true);
    try {
      const response = await leaveTypeService.fetchAllLeaveTypes();
      console.log("response: ", response);
      return response;
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch leaves!");
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchLeaves, isLoading };
};
