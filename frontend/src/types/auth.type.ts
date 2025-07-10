export type Role = "employee" | "admin";

export type LoginForm = {
  email: string;
  password: string;
  role?: Role;
};
export type RegisterForm = {
  email: string;
  password: string;
  name: string;
  department: string;
};
