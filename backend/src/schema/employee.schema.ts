export const employeeTable = {
  name: "employee",
  schema: `
    CREATE TABLE IF NOT EXISTS employee (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('employee', 'admin') DEFAULT 'employee',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `,
};

export interface Employee {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "employee" | "admin";
}
