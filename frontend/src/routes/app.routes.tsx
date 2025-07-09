import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "./auth.routes";
import { adminRoutes } from "./admin.routes";
import { EmployeeRoutes } from "./employee.routes";
import { Suspense } from "react";

export const AppRoutes = () => (
  <Suspense fallback={<h1>Loading ...</h1>}>
    <Routes>
      {AuthRoutes}
      {EmployeeRoutes}
      {adminRoutes}
      <Route path="*" element={<h1>Not founded page!</h1>} />
    </Routes>
  </Suspense>
);
