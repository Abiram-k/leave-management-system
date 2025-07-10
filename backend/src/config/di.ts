import { AuthController } from "../controllers/auth.controller";
import { LeaveController } from "../controllers/leave.controller";
import { IAuthController } from "../interfaces/controllers/auth.controller.interface";
import { ILeaveController } from "../interfaces/controllers/leave.controller.interface";
import { IEmployeeRepository } from "../interfaces/repositories/employee.repository.interface";
import { ILeaveRepository } from "../interfaces/repositories/leave.repository.interface";
import { IAuthService } from "../interfaces/services/auth.service.interface";
import { ILeaveService } from "../interfaces/services/leave.service.interface";
import { EmployeeRepository } from "../repositories/employee.repository";
import { LeaveRepository } from "../repositories/leave.repository";
import { AuthService } from "../services/auth.service";
import { LeaveService } from "../services/leave.service";

// REPOSITORIES
const employeeRepo: IEmployeeRepository = new EmployeeRepository();
const leaveRepo: ILeaveRepository = new LeaveRepository();

// SERVICES
const authService: IAuthService = new AuthService(employeeRepo);
const leaveService: ILeaveService = new LeaveService(leaveRepo);

// CONTROLLERS
const authController: IAuthController = new AuthController(authService);
const leaveController: ILeaveController = new LeaveController(leaveService);

export { authController,leaveController };
