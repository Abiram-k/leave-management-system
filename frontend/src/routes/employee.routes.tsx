import { lazy } from "react";
import { Route } from "react-router-dom";

const EmployeeDashboard = lazy(
  () => import("@/features/employee/dashboard/pages/EmployeeDashboard")
);
const LeaveList = lazy(
  () => import("@/features/employee/leaveList/pages/LeaveList")
);

export const EmployeeRoutes = (
  <>
    <Route path="/dashboard" element={<EmployeeDashboard />} />
    <Route path="/leaves" element={<LeaveList />} />
  </>
);
