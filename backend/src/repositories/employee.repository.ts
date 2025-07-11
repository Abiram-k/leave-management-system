import { HttpStatusCode } from "../config/constants/httpStatusCode.enum";
import { db } from "../config/db";
import { IEmployeeRepository } from "../interfaces/repositories/employee.repository.interface";
import { Employee } from "../schema/employee.schema";
import { Register } from "../types/auth.type";
import { LeaveData } from "../types/leave.type";
import { AppError } from "../utils/app.error";

export class EmployeeRepository implements IEmployeeRepository {
  async findByEmail(email: string): Promise<Employee | null> {
    try {
      const [rows] = await db.query("SELECT * FROM employee WHERE email= ?", [
        email,
      ]);
      return rows[0];
    } catch (error) {
      console.log(error);
      throw new AppError("Failed to fetch Employee by email!");
    }
  }

  async create(data: Register): Promise<boolean> {
    try {
      const result = await db.query(
        "INSERT INTO employee (name, email, password) VALUES (?, ?, ?)",
        [data.name, data.email, data.password]
      );
      console.log(result);
      return true;
    } catch (error) {
      console.log(error);
      throw new AppError("Failed to create new employee");
    }
  }

  async getAllEmployees(
    searchTerm: string,
    page: number,
    limit: number
  ): Promise<{ data: Employee[]; totalPages: number }> {
    const offset = (page - 1) * limit;
    const conditions: string[] = ["role != 'admin'"];
    const params: any[] = [];

    if (searchTerm) {
      conditions.push("name LIKE ?");
      params.push(`%${searchTerm}%`);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const [employees] = await db.query<Employee[]>(
      `SELECT id, name, email, role FROM employee ${whereClause} ORDER BY id DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    const [countRows] = await db.query<any[]>(
      `SELECT COUNT(*) as total FROM employee ${whereClause}`,
      params
    );

    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit);

    return { data: employees, totalPages };
  }
  async deleteEmployee(id: number): Promise<void> {
    const [result] = await db.query<Employee[]>(
      `SELECT id FROM employee WHERE id = ?`,
      [id]
    );

    if (result.length === 0) {
      throw new AppError(
        `Employee with ID ${id} does not exist`,
        HttpStatusCode.BAD_REQUEST
      );
    }

    await db.query(`DELETE FROM employee WHERE id = ?`, [id]);
  }

  async getEmployeeLeaves(employeeId: number): Promise<LeaveData[]> {
    const [leaves] = await db.query<LeaveData[]>(
      `
     SELECT leave_requests.*, leave_types.leaveType
     FROM leave_requests
     JOIN leave_types ON leave_requests.leave_type_id = leave_types.id
     WHERE leave_requests.employee_id = ?
     ORDER BY leave_requests.start_date DESC
      `,
      [employeeId]
    );
    return leaves;
  }
  async updateEmployee(id: number, data: Partial<Employee>): Promise<void> {
    if (isNaN(id)) {
      throw new AppError(
        "Invalid employee ID: must be a number.",
        HttpStatusCode.BAD_REQUEST
      );
    }
    const { id: _, email, ...updateData } = data;

    if (email) {
      const [existing] = await db.query(
        "SELECT id FROM employee WHERE email = ? AND id != ?",
        [email, id]
      );
      if ((existing as Employee[]).length > 0) {
        throw new AppError("Email already in use.", HttpStatusCode.CONFLICT);
      }
    }
    const fields = Object.keys(data)
      .filter((key) => key !== "id")
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.keys(data)
      .filter((key) => key !== "id")
      .map((key) => (data as any)[key]);

    await db.query(`UPDATE employee SET ${fields} WHERE id = ?`, [
      ...values,
      id,
    ]);
  }
}
