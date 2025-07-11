import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";

export enum UserRole {
  ADMIN = "admin",
  EMPLOYEE = "employee",
}

export class LoginDto {
  @IsEmail({}, { message: "Email must be a valid email address" })
  email!: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password!: string;

  @IsEnum(UserRole, { message: "Role must be either 'admin' or 'employee'" })
  role!: UserRole;
}
