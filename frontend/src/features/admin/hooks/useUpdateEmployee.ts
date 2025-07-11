import { EmployeeService } from "@/api/employee.service";
import type { EmployeeFormType } from "@/types/form.type";
import type { ResponseType } from "@/types/response.type";
import { useState } from "react";
import { toast } from "sonner";

export const useUpdateEmployee = () => {
  const [isLoading, setIsLoading] = useState(false);
  const leaveService = new EmployeeService();

  const updateEmployees = async (
    emp_id: number,
    data: EmployeeFormType
  ): Promise<ResponseType | undefined> => {
    setIsLoading(true);
    try {
      const response = await leaveService.updateEmployee(emp_id, data);
      console.log("response: ", response);
      return response;
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch leaves!");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateEmployees, isLoading };
};
