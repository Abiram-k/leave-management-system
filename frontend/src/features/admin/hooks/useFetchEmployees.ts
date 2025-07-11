import { EmployeeService } from "@/api/employee.service";
import { useState } from "react";
import { toast } from "sonner";

export const useFetchEmployees = () => {
  const [isLoading, setIsLoading] = useState(false);
  const leaveService = new EmployeeService();

  const fetchEmployees = async (
    searchTerm: string,
    page: number,
    limit: number
  ) => {
    setIsLoading(true);
    try {
      const response = await leaveService.getAllEmployee(
        searchTerm,
        page,
        limit
      );
      console.log(" response: ", response);
      return response;
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch leaves!");
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchEmployees, isLoading };
};
