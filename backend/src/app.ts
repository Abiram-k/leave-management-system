import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import employeeRoutes from "./routes/employee.router";
import authRoutes from "./routes/auth.router";
import adminRoutes from "./routes/admin.router";
import { errorHandler } from "./middlewares/error.middleware";
import { verifyEmployee } from "./middlewares/verify.employee";
import { verifyAdmin } from "./middlewares/verify.admin";
import { config } from "dotenv";
config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());

app.get("/", (_, res) => {
  res.json({ success: true, message: "Server is running- leave_management" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/employee", verifyEmployee, employeeRoutes); 
app.use("/api/v1/admin", verifyAdmin, adminRoutes);
app.use(errorHandler);

export default app;
