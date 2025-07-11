import { Request, Response, NextFunction } from "express";
import { IEmployeeController } from "../interfaces/controllers/employee.controller.interface";
import { IEmployeeService } from "../interfaces/services/employee.service.interface";
import { HttpStatusCode } from "../config/constants/httpStatusCode.enum";
import { IAuthService } from "../interfaces/services/auth.service.interface";

export class EmployeeController implements IEmployeeController {
  private readonly _empService: IEmployeeService;
  private readonly _authService: IAuthService;
  constructor(empService: IEmployeeService, authService: IAuthService) {
    this._empService = empService;
    this._authService = authService;
  }

  async getAllEmployees(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { search = "", page = 1, limit = 10 } = req.query;
      const result = await this._empService.getAllEmployees(
        String(search),
        Number(page),
        Number(limit)
      );
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      console.error("Error fetching employees:", error);
      next(error);
    }
  }

  async deleteEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.empId);
      await this._empService.deleteEmployee(id);
      res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
      console.error("Error deleting employee:", error);
      next(error);
    }
  }

  async updateEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.empId);
      const data = req.body;
      await this._empService.updateEmployee(id, data);
      res
        .status(HttpStatusCode.OK)
        .json({ success: true, message: "Employee updated successfully" });
    } catch (error) {
      console.error("Error updating employee:", error);
      next(error);
    }
  }
  async addNewEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password } = req.body;
      // console.log("Name: ", name, "Email: ", email, "Password: ", password);

      if (!name || !email || !password) throw new Error("Credential missing!");

      await this._authService.register({ name, email, password });
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "employee registered successfully",
      });
      return;
    } catch (error) {
      console.log("Error while adding employee: ", error);
      next(error);
    }
  }

  async getEmployeeLeaves(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const employeeId = Number(req.params.id);
      const leaves = await this._empService.getEmployeeLeaves(employeeId);
      res.status(HttpStatusCode.OK).json(leaves);
    } catch (error) {
      console.error("Error fetching employee leaves:", error);
      next(error);
    }
  }
}
