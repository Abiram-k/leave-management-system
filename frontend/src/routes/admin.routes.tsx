import { lazy } from "react";
import { Route } from "react-router-dom";
const AdminDashboard = lazy(
  () => import("@/features/admin/pages/AdminDashboard")
);

export const adminRoutes = (
  <>
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
  </>
);
