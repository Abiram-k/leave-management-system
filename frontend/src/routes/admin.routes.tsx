import { lazy } from "react";
import { Route } from "react-router-dom";
const AdminDashboard = lazy(
  () => import("@/features/admin/pages/AdminDashboard")
);
const LeaveTypesManager = lazy(
  () => import("@/features/admin/pages/LeaveTypesManager")
);

export const adminRoutes = (
  <>
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route
      path="/admin/leave-types-management/" 
      element={<LeaveTypesManager />}
    />
  </>
);
