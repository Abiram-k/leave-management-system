import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { formatDate } from "@/utils/formatDate";
import { leaveStatusIcon } from "./leaveStatusIcon";

const leaveTypes = {
  1: "Annual Leave",
  2: "Sick Leave",
  3: "Maternity/Paternity",
  4: "Unpaid Leave",
};

const Leave = ({
  leave,
  onEdit,
  onDelete,
}: {
  leave: any;
  onEdit: any;
  onDelete: any;
}) => {
  return (
    <Paper
      key={leave.id}
      elevation={3}
      sx={{
        "&:hover": {
          backgroundColor: "rgba(16, 42, 75, 0.9)",
          borderColor: "rgba(0, 210, 255, 0.3)",
          boxShadow: "0 8px 32px 0 rgba(0, 210, 255, 0.1)",
          transform: "scale(1.01)",
          cursor: "pointer",
        },
        p: 3,
        borderRadius: 3,
        color: "white",
        borderColor: "divider",
        backgroundColor: "rgba(16, 42, 75, 0.7)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: "primary.50", color: "primary.main" }}>
            <CalendarIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="medium">
              {/* {leaveTypes[leave.leave_type_id]  || "Unknown Leave Type"} */}
              Unknow leave type
            </Typography>
            <Typography variant="body2" color="gray">
              {formatDate(leave.start_date)} - {formatDate(leave.end_date)}
            </Typography>
          </Box>
        </Stack>

        <Chip
          label={leave.status}
          icon={leaveStatusIcon(leave.status)}
          variant="outlined"
          sx={{
            borderColor:
              leave.status === "Approved"
                ? "success.main"
                : leave.status === "Rejected"
                ? "error.main"
                : "warning.main",
            color:
              leave.status === "Approved"
                ? "success.main"
                : leave.status === "Rejected"
                ? "error.main"
                : "warning.main",
          }}
        />
      </Stack>

      {leave.reason && (
        <Typography variant="body2" paragraph sx={{ mb: 2 }}>
          {leave.reason}
        </Typography>
      )}

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" color="gray">
          Applied on: {new Date(leave.created_at).toLocaleString()}
        </Typography>

        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => onEdit(leave)}
            size="small"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              color: "lightblue",
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => onDelete(leave.id)}
            size="small"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              color: "error.main",
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Leave;
