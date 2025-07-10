export const leaveTypesTable = {
  name: "leave_types",
  schema: `
   CREATE TABLE IF NOT EXISTS leave_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    max_days INT NOT NULL
    );
  `,
};

export interface LeaveTypes {
  id: number;
  name: string;
  max_days: number;
}
