import express from "express";
import employeeRoutes from "./routes/employee.router";
import authRoutes from "./routes/auth.router";
import adminRoutes from "./routes/admin.router";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.json({ success: true, message: "Server is running" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use(errorHandler);

export default app;
