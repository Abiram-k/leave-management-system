import { Router } from "express";
import { leaveController } from "../config/di"; // assuming DI pattern
import { validateDto } from "../middlewares/validate.middleware";
import { LeaveDto } from "../dtos/leave.dto";

const router = Router();

router
  .route("/leave")
  .get(leaveController.getMyLeaves.bind(leaveController))
  .post(
    validateDto(LeaveDto),
    leaveController.AddNewLeave.bind(leaveController)
  )
  .put(
    validateDto(LeaveDto),
    leaveController.updateLeave.bind(leaveController)
  );

router
  .route("/leave/:id")
  .get(leaveController.getLeaveById.bind(leaveController))
  .delete(leaveController.deleteLeave.bind(leaveController));

export default router;
