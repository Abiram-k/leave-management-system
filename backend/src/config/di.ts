import { AuthController } from "../controllers/auth.controller";
import { EmployeeController } from "../controllers/employee.controller";
import { LeaveController } from "../controllers/leave.controller";
import { LeaveTypeController } from "../controllers/leave.types.controller";
import { IAuthController } from "../interfaces/controllers/auth.controller.interface";
import { IEmployeeController } from "../interfaces/controllers/employee.controller.interface";
import { ILeaveController } from "../interfaces/controllers/leave.controller.interface";
import { ILeaveTypeController } from "../interfaces/controllers/leave.types.controller.interface";
import { IEmployeeRepository } from "../interfaces/repositories/employee.repository.interface";
import { ILeaveRepository } from "../interfaces/repositories/leave.repository.interface";
import { ILeaveTypeRepository } from "../interfaces/repositories/leave.type.repository.interface";
import { IAuthService } from "../interfaces/services/auth.service.interface";
import { IEmployeeService } from "../interfaces/services/employee.service.interface";
import { ILeaveService } from "../interfaces/services/leave.service.interface";
import { ILeaveTypeService } from "../interfaces/services/leave.types.service.interface";
import { EmployeeRepository } from "../repositories/employee.repository";
import { LeaveRepository } from "../repositories/leave.repository";
import { LeaveTypeRepository } from "../repositories/leave.type.repository";
import { AuthService } from "../services/auth.service";
import { EmployeeService } from "../services/employee.service";
import { LeaveService } from "../services/leave.service";
import { LeaveTypeService } from "../services/leave.types.service";

// REPOSITORIES
const employeeRepo: IEmployeeRepository = new EmployeeRepository();
const leaveRepo: ILeaveRepository = new LeaveRepository();
const leaveTypesRepo: ILeaveTypeRepository = new LeaveTypeRepository();

// SERVICES
const authService: IAuthService = new AuthService(employeeRepo);
const leaveService: ILeaveService = new LeaveService(leaveRepo);
const employeeService: IEmployeeService = new EmployeeService(
  employeeRepo,
  leaveRepo
);
const leaveTypesService: ILeaveTypeService = new LeaveTypeService(
  leaveTypesRepo
);

// CONTROLLERS
const authController: IAuthController = new AuthController(authService);
const leaveController: ILeaveController = new LeaveController(leaveService);
const employeeController: IEmployeeController = new EmployeeController(
  employeeService,
  authService
);
const leaveTypesController: ILeaveTypeController = new LeaveTypeController(
  leaveTypesService
);
export {
  authController,
  leaveController,
  employeeController,
  leaveTypesController,
};
