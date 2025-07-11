import { Router } from "express";
import { employeeController, leaveTypesController } from "../config/di"; // dependency injection assumed
import { validateDto } from "../middlewares/validate.middleware";
import { RegisterDto, UpdateEmployeeDto } from "../dtos/register.dto";

const router = Router();

router
  .get("/employee", employeeController.getAllEmployees.bind(employeeController))
  .post(
    "/employee",
    validateDto(RegisterDto),
    employeeController.addNewEmployee.bind(employeeController)
  )
  .put(
    "/employee/:empId",
    validateDto(UpdateEmployeeDto),
    employeeController.updateEmployee.bind(employeeController)
  )
  .delete(
    "/employee/:empId",
    employeeController.deleteEmployee.bind(employeeController)
  );

router.get(
  "/employee/leaves",
  employeeController.getEmployeeLeaves.bind(employeeController)
);

// router.patch(
//   "/employee/leaves",
//   employeeController..bind(employeeController)
// );

router.get(
  "/employee/leave-types",
  leaveTypesController.getAll.bind(leaveTypesController)
);
router.put(
  "/employee/leave-types/:leaveId",
  leaveTypesController.update.bind(leaveTypesController)
);
router.post(
  "/employee/leave-types",
  leaveTypesController.create.bind(leaveTypesController)
);
router.delete(
  "/employee/leave-types/:leaveId",
  leaveTypesController.delete.bind(leaveTypesController)
);

export default router;
