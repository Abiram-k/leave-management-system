import { HttpStatusCode } from "../config/constants/httpStatusCode.enum";
import { db } from "../config/db";
import { IEmployeeRepository } from "../interfaces/repositories/employee.repository.interface";
import { Employee } from "../schema/employee.schema";
import { Register } from "../types/auth.type";
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
}
