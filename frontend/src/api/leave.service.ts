import { axiosInstance } from "./api.service";
import type { ResponseType } from "@/types/response.type";
import type { LeaveResType, LeaveTypes } from "@/types/leave.type";
import type { LeaveFormField } from "@/types/form.type";

type GetMyLeaveRes = ResponseType & {
  leaves: LeaveResType[];
  leaveTypes: LeaveTypes[];
};

export class LeaveService {
  async getMyLeaves(): Promise<GetMyLeaveRes> {
    try {
      const response = await axiosInstance.get("/employee/leave");
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

  async getSelectedLeave(
    leaveId: number
  ): Promise<LeaveResType & ResponseType> {
    try {
      const response = await axiosInstance.get(`/employee/leave/:${leaveId}`);
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
  async updateLeave(
    leaveData: LeaveFormField
  ): Promise<LeaveResType & ResponseType> {
    try {
      const response = await axiosInstance.put(`/employee/leave`, leaveData);
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
  async addLeave(
    leaveData: LeaveFormField
  ): Promise<LeaveResType & ResponseType> {
    try {
      const response = await axiosInstance.post(`/employee/leave`, leaveData);
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
  async deleteLeave(leaveId: number): Promise<LeaveResType & ResponseType> {
    try {
      const response = await axiosInstance.delete(
        `/employee/leave/:${leaveId}`
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
