import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "./auth.routes";
import { adminRoutes } from "./admin.routes";
import { EmployeeRoutes } from "./employee.routes";
import { Suspense } from "react";
import { Loader } from "@/components/spinner";

export const AppRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {AuthRoutes}
      {EmployeeRoutes}
      {adminRoutes}
      <Route path="*" element={<h1>Not founded page!</h1>} />
    </Routes>
  </Suspense>
);
