import { db } from "../config/db";
import { ILeaveTypeRepository } from "../interfaces/repositories/leave.type.repository.interface";
import { LeaveTypes } from "../types/leave.type";

export class LeaveTypeRepository implements ILeaveTypeRepository {
  async getAll(): Promise<LeaveTypes[]> {
    const [rows] = await db.query<LeaveTypes[]>(
      `SELECT id, name, max_days FROM leave_types ORDER BY id DESC`
    );
    return rows;
  }

  async getById(id: number): Promise<LeaveTypes | null> {
    const [rows] = await db.query<LeaveTypes[]>(
      `SELECT id, name, max_days FROM leave_types WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  }

  async create(data: Omit<LeaveTypes, "id">): Promise<void> {
    await db.query(`INSERT INTO leave_types (name, max_days) VALUES (?, ?)`, [
      data.name,
      data.max_days,
    ]);
  }

  async update(id: number, data: Partial<LeaveTypes>): Promise<void> {
    const fields = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(data);
    await db.query(`UPDATE leave_types SET ${fields} WHERE id = ?`, [
      ...values,
      id,
    ]);
  }

  async delete(id: number): Promise<void> {
    await db.query(`DELETE FROM leave_types WHERE id = ?`, [id]);
  }
}
