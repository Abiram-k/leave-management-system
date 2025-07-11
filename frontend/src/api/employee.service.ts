import { axiosInstance } from "./api.service";
import type { ResponseType } from "@/types/response.type";
import type { LeaveStatus } from "@/types/leave.type";
import type { Employee } from "@/types/employee.type";
import type { EmployeeFormType } from "@/types/form.type";

type GetAllEmployeeType = ResponseType & {
  data: Employee[];
  totalPages: number;
};
export class EmployeeService {
  async getAllEmployee(
    searchTerm: string,
    page: number,
    limit: number
  ): Promise<GetAllEmployeeType> {
    try {
      const response = await axiosInstance.get(
        `/admin/employee?search=${searchTerm}&page=${page}&limi=${limit}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.isAxiosError) {
        throw new Error(error.response?.data.message || "Something went wrong");
      } else {
        throw new Error(error.message || "Something went wrong");
      }
    }
  }

  async updateEmployee(
    emp_id: number,
    data: EmployeeFormType
  ): Promise<ResponseType> {
    try {
      const response = await axiosInstance.put(
        `/admin/employee/${emp_id}`,
        data
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.isAxiosError) {
        throw new Error(error.response?.data.message || "Something went wrong");
      } else {
        throw new Error(error.message || "Something went wrong");
      }
    }
  }

  async removeEmployee(emp_id: number): Promise<ResponseType> {
    try {
      const response = await axiosInstance.delete(`/admin/employee/${emp_id}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.isAxiosError) {
        throw new Error(error.response?.data.message || "Something went wrong");
      } else {
        throw new Error(error.message || "Something went wrong");
      }
    }
  }

  async addNewEmployee(data: EmployeeFormType): Promise<ResponseType> {
    try {
      const response = await axiosInstance.post("/admin/employee", data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.isAxiosError) {
        throw new Error(error.response?.data.message || "Something went wrong");
      } else {
        throw new Error(error.message || "Something went wrong");
      }
    }
  }

  async getAllLeavesOfEmployee(emp_id: number): Promise<ResponseType> {
    try {
      const response = await axiosInstance.get(
        `/admin/employee/leaves/${emp_id}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.isAxiosError) {
        throw new Error(error.response?.data.message || "Something went wrong");
      } else {
        throw new Error(error.message || "Something went wrong");
      }
    }
  }

  async changLeaveStatus(
    leave_id: number,
    status: LeaveStatus
  ): Promise<ResponseType> {
    try {
      const response = await axiosInstance.patch(
        `/admin/employee/leaves/${leave_id}`,
        { status }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.isAxiosError) {
        throw new Error(error.response?.data.message || "Something went wrong");
      } else {
        throw new Error(error.message || "Something went wrong");
      }
    }
  }
}
