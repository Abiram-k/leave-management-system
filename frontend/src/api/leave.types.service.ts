import type { LeaveTypes } from "@/types/leave.type";
import { axiosInstance } from "./api.service";
import type { ResponseType } from "@/types/response.type";

export type GetLeaveTypes = ResponseType & {
  leaveTypes: LeaveTypes[];
};
export class LeaveTypesService {
  async fetchAllLeaveTypes(): Promise<GetLeaveTypes> {
    try {
      const response = await axiosInstance.get(`/admin/employee/leave-types`);
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
  async updateLeaveType(
    leaveId: number,
    data: Omit<LeaveTypes, "id">
  ): Promise<ResponseType> {
    try {
      const response = await axiosInstance.put(
        `/admin/employee/leave-types/${leaveId}`,
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
  async addLeaveTypes(data: Omit<LeaveTypes, "id">): Promise<ResponseType> {
    try {
      const response = await axiosInstance.post(
        `/admin/employee/leave-types`,
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

  async deleteLeaveType(leaveId: number): Promise<ResponseType | undefined> {
    try {
      const response = await axiosInstance.delete(
        `/admin/employee/leave-types/${leaveId}`
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
