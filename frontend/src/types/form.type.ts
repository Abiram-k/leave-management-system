export type FormField = {
  name: string;
  label: string;
  type: "email" | "text" | "password";
  placeholder: string;
}[];

export type LeaveFormField = {
  leaveType: number;
  startDate: Date;
  endDate: Date;
  reason: string;
};

export type EmployeeFormType = {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
};
