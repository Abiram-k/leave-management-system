import { IEmployeeRepository } from "../interfaces/repositories/employee.repository.interface";
import { ILeaveRepository } from "../interfaces/repositories/leave.repository.interface";
import { IEmployeeService } from "../interfaces/services/employee.service.interface";
import { Employee } from "../schema/employee.schema";
import { Register } from "../types/auth.type";
import { LeaveData } from "../types/leave.type";

export class EmployeeService implements IEmployeeService {
  private readonly _employeeRepo: IEmployeeRepository;
  private readonly _leaveRepo: ILeaveRepository;
  constructor(employeeRepo: IEmployeeRepository, leaveRepo: ILeaveRepository) {
    this._employeeRepo = employeeRepo;
    this._leaveRepo = leaveRepo;
  }

  async getAllEmployees(
    searchTerm: string,
    page: number,
    limit: number
  ): Promise<{ data: Employee[]; totalPages: number }> {
    return this._employeeRepo.getAllEmployees(searchTerm, page, limit);
  }

  async deleteEmployee(id: number): Promise<void> {
    await this._employeeRepo.deleteEmployee(id);
  }

  async getEmployeeLeaves(employeeId: number): Promise<LeaveData[]> {
    return this._employeeRepo.getEmployeeLeaves(employeeId);
  }

  async updateEmployee(id: number, data: Partial<Employee>): Promise<void> {
    await this._employeeRepo.updateEmployee(id, data);
  }

  async addNewEmployee(data: Register): Promise<void> {}
}
