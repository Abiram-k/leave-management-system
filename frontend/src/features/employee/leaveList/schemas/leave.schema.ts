import * as Yup from "yup";

export const LeaveSchema = Yup.object().shape({
  leaveType: Yup.string().required("Leave type is required"),
  startDate: Yup.date()
    .required("Start date is required")
    .min(new Date(), "Start date cannot be in the past"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date cannot be before start date"),
  reason: Yup.string()
    .required("Reason is required")
    .min(10, "Reason must be at least 10 characters"),
});
