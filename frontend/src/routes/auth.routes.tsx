import { lazy } from "react";
import { Route } from "react-router-dom";

const EmployeeLoginPage = lazy(
  () => import("../features/auth/pages/EmployeeLoginPage")
);
const EmployeeRegisterPage = lazy(
  () => import("../features/auth/pages/EmployeeRegisterPage")
);

export const AuthRoutes = (
  <>
    <Route path="/auth/login" element={<EmployeeLoginPage />} />
    <Route path="/auth/register" element={<EmployeeRegisterPage />} />
  </>
);
