import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Leave from "@/components/Leave";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import LeaveApplicationModal from "../components/LeaveApplicationModal ";
import type { LeaveFormField } from "@/types/form.type";
import { useAddLeave } from "../hooks/useAddLeave";
import { useNavigate } from "react-router-dom";
const leaves = [
  {
    id: 1,
    employee_id: 101,
    leave_type_id: 1, // Annual Leave
    start_date: "2023-06-15",
    end_date: "2023-06-18",
    reason: "Family vacation in Hawaii",
    status: "Approved",
    created_at: "2023-05-20T09:30:00Z",
  },
  {
    id: 2,
    employee_id: 101,
    leave_type_id: 2, // Sick Leave
    start_date: "2023-07-05",
    end_date: "2023-07-07",
    reason: "Severe flu with fever",
    status: "Approved",
    created_at: "2023-06-28T14:15:00Z",
  },
  {
    id: 3,
    employee_id: 101,
    leave_type_id: 3, // Maternity/Paternity
    start_date: "2023-09-01",
    end_date: "2023-11-30",
    reason: "Paternity leave for newborn",
    status: "Pending",
    created_at: "2023-08-15T11:20:00Z",
  },
  {
    id: 4,
    employee_id: 101,
    leave_type_id: 4, // Unpaid Leave
    start_date: "2023-08-10",
    end_date: "2023-08-12",
    reason: "Personal matters to attend to",
    status: "Rejected",
    created_at: "2023-07-30T16:45:00Z",
  },
  {
    id: 5,
    employee_id: 101,
    leave_type_id: 1, // Annual Leave
    start_date: "2023-12-20",
    end_date: "2023-12-31",
    reason: "Year-end holidays with family",
    status: "Pending",
    created_at: "2023-11-01T10:00:00Z",
  },
];
const LeaveList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, addLeave } = useAddLeave();

  const navigate = useNavigate();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (data: LeaveFormField) => {
    console.log(data);
    addLeave(data);
  };

  const onEdit = () => {};
  const onDelete = () => {};

  return (
    <Box sx={{ maxWidth: "md", mx: "auto", p: 2 }}>
      <LeaveApplicationModal
        type="add"
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        open={isModalOpen}
        isLoading={isLoading}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ color: "white" }}
            aria-label="Go back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight="bold" color="white">
            My Leave Applications
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            py: 1,
          }}
        >
          Apply Leave
        </Button>
      </Stack>

      {leaves.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            bgcolor: "background.paper",
            color: "white",
            borderColor: "divider",
            backgroundColor: "rgba(16, 42, 75, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
          }}
        >
          <Typography variant="body1" color="white">
            No leave applications found. Click "Apply Leave" to create one.
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {leaves.map((leave: any, index: number) => (
            <Leave
              leave={leave}
              onDelete={onDelete}
              onEdit={onEdit}
              key={`${leave?.created_at}_${index}`}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default LeaveList;
