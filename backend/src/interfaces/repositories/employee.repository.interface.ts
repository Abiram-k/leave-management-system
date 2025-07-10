import { Employee } from "../../schema/employee.schema";
import { Register } from "../../types/auth.type";

export interface IEmployeeRepository {
  findByEmail(email: string): Promise<Employee | null>;
  create(data: Register): Promise<boolean>;
}
