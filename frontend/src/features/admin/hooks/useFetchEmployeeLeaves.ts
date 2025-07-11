import { EmployeeService } from "@/api/employee.service";
import { useState } from "react";
import { toast } from "sonner";

export const useFetchEmployeeLeaves = () => {
  const [isLoading, setIsLoading] = useState(false);
  const leaveService = new EmployeeService();

  const fetchLeaves = async (emp_id: number): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await leaveService.getAllLeavesOfEmployee(emp_id);
      console.log("response: ", response);
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch leaves!");
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchLeaves, isLoading };
};
