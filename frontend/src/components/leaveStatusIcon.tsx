import {
  HourglassEmpty as PendingIcon,
  CheckCircle as ApprovedIcon,
  Cancel as RejectedIcon,
} from "@mui/icons-material";

export const leaveStatusIcon = (status: any) => {
  switch (status) {
    case "Approved":
      return <ApprovedIcon color="success" />;
    case "Rejected":
      return <RejectedIcon color="error" />;
    default:
      return <PendingIcon color="warning" />;
  }
};
