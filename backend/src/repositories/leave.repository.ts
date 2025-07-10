import { HttpStatusCode } from "../config/constants/httpStatusCode.enum";
import { db } from "../config/db";
import { leaveReqType } from "../dtos/leave.dto";
import { ILeaveRepository } from "../interfaces/repositories/leave.repository.interface";
import { LeaveTypes } from "../schema/leave.types.schema";
import { LeaveData } from "../types/leave.type";
import { AppError } from "../utils/app.error";

export class LeaveRepository implements ILeaveRepository {
  async create(data: leaveReqType, employee_id: number): Promise<boolean> {
    try {
      const query = `
        INSERT INTO leave_requests 
        (employee_id, leave_type_id, start_date, end_date, reason, status)
        VALUES (?, ?, ?, ?, ?, ?)`;

      // data.leaveType,
      await db.query(query, [
        employee_id,
        data.leaveType,
        data.startDate,
        data.endDate,
        data.reason,
        "Pending",
      ]);

      return true;
    } catch (error) {
      console.error("Error in LeaveRepository.create:", error);
      throw new AppError(
        "Failed to create leave request",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateLeave(data: Partial<leaveReqType>): Promise<boolean> {
    try {
      const fields: string[] = [];
      const values: any[] = [];

      for (const key in data) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }

      if (fields.length === 0) {
        throw new AppError(
          "No fields provided to update",
          HttpStatusCode.BAD_REQUEST
        );
      }

      console.log("Values: ", values, "Fields: ", fields);
      const query = `UPDATE leave_requests SET ${fields.join(
        ", "
      )} WHERE id = ?`;

      const [result] = await db.query(query, values);
      return true;
    } catch (error) {
      console.error("Error updating leave:", error);
      throw new AppError(
        "Failed to update leave",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findById(id: number): Promise<LeaveData | null> {
    try {
      const [rows] = await db.query(
        "SELECT * FROM leave_requests WHERE id = ?",
        [id]
      );
      const results = rows as LeaveData[];
      return results[0] ?? null;
    } catch (error) {
      console.error("Error in LeaveRepository.findById:", error);
      throw new AppError(
        "Error fetching leave request",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findMyLeaves(employee_id: number): Promise<LeaveData[]> {
    try {
      const [rows] = await db.query(
        "SELECT * FROM leave_requests ORDER BY created_at DESC WHERE employee_id = ?",
        [employee_id]
      );
      return rows as LeaveData[];
    } catch (error) {
      console.error("Error in LeaveRepository.findAll:", error);
      throw new AppError(
        "Error fetching leave list",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
  async findAll(): Promise<LeaveData[]> {
    try {
      const [rows] = await db.query(
        "SELECT * FROM leave_requests ORDER BY created_at DESC"
      );
      return rows as LeaveData[];
    } catch (error) {
      console.error("Error in LeaveRepository.findAll:", error);
      throw new AppError(
        "Error fetching leave list",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async delete(leaveId: number): Promise<boolean> {
    try {
      const [result] = await db.query(
        "DELETE FROM leave_requests WHERE id = ?",
        [leaveId]
      );
      const { affectedRows } = result as { affectedRows: number };
      return affectedRows > 0; // to will return how many row altered
    } catch (error) {
      console.error("Error in LeaveRepository.delete:", error);
      throw new AppError(
        "Error deleting leave request",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getLeaveTypes(): Promise<LeaveTypes[]> {
    try {
      const [result] = await db.query("SELECT * FROM leave_types");
      return result as LeaveTypes[];
    } catch (error) {
      console.error("Error in LeaveRepository.get.leavetypes:", error);
      throw new AppError(
        "Error fetching leave type",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
