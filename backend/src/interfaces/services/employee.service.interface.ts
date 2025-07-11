import { Employee } from "../../schema/employee.schema";
import { Register } from "../../types/auth.type";
import { LeaveData } from "../../types/leave.type";

export interface IEmployeeService {
  getAllEmployees(
    searchTerm: string,
    page: number,
    limit: number
  ): Promise<{ data: Employee[]; totalPages: number }>;

  deleteEmployee(id: number): Promise<void>;

  getEmployeeLeaves(employeeId: number): Promise<LeaveData[]>;

  updateEmployee(id: number, data: Partial<Employee>): Promise<void>;
  addNewEmployee(data: Register): Promise<void>;
}
