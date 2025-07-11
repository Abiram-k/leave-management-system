import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Chip,
  Paper,
} from "@mui/material";
import { Add, Edit, Delete, Save, Cancel } from "@mui/icons-material";
import { useFetchLeaveTypes } from "../hooks/leaveTypes/useFetchLeaveTypes";
import { Loader } from "@/components/spinner";
import { useUpdateLeaveTypes } from "../hooks/leaveTypes/useUpdateLeaveType";
import { useAddLeaveTypes } from "../hooks/leaveTypes/useAddLeaveType";
import { useDeleteLeaveTypes } from "../hooks/leaveTypes/useDeleteLeaveTypes";
import { toast } from "sonner";

export interface LeaveType {
  id: number;
  name: string;
  max_days: number;
}

const LeaveTypesManager = () => {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentLeaveType, setCurrentLeaveType] = useState<LeaveType | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Omit<LeaveType, "id">>({
    name: "",
    max_days: 0,
  });

  const [errors, setErrors] = useState<{ name?: string; max_days?: string }>(
    {}
  );

  const { fetchLeaves, isLoading } = useFetchLeaveTypes();
  const { isLoading: updateIsLoading, updateLeave } = useUpdateLeaveTypes();
  const { isLoading: addIsLoading, addLeave } = useAddLeaveTypes();
  const { deleteLeave, isLoading: deleteIsloading } = useDeleteLeaveTypes();

  useEffect(() => {
    const loadLeaveTypes = async () => {
      const response = await fetchLeaves();
      console.log("RESPONSE: ", response);
      if (response) {
        setLeaveTypes(response.leaveTypes);
      }
    };
    loadLeaveTypes();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "max_days" ? parseInt(value) || 0 : value,
    });

    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; max_days?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Leave type name is required";
    }

    if (formData.max_days <= 0) {
      newErrors.max_days = "Max days must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (isEditing && currentLeaveType) {
      console.log("CURRENT: ", currentLeaveType);
      const response = await updateLeave(currentLeaveType.id, formData);
      if (response && response.success)
        setLeaveTypes(
          leaveTypes.map((lt) =>
            lt.id === currentLeaveType.id ? { ...lt, ...formData } : lt
          )
        );
    } else {
      const response = await addLeave(formData);
      if (response && response.success) {
        const newId = Math.max(...leaveTypes.map((lt) => lt.id), 0) + 1;
        setLeaveTypes([...leaveTypes, { id: newId, ...formData }]);
      }
    }

    handleCloseDialog();
  };

  const handleAddLeaveType = () => {
    setFormData({ name: "", max_days: 0 });
    setIsEditing(false);
    setCurrentLeaveType(null);
    setOpenDialog(true);
    setErrors({});
  };

  const handleEditLeaveType = (leaveType: LeaveType) => {
    setFormData({ name: leaveType.name, max_days: leaveType.max_days });
    setIsEditing(true);
    setCurrentLeaveType(leaveType);
    setOpenDialog(true);
    setErrors({});
  };

  const handleDeleteLeaveType = (id: number) => {
    deleteLeave(id);
    toast.success("Successfully deleted");
    setLeaveTypes(leaveTypes.filter((lt) => lt.id !== id));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentLeaveType(null);
    setFormData({ name: "", max_days: 0 });
    setErrors({});
  };

  const getBadgeColor = (maxDays: number) => {
    if (maxDays >= 30) return "success";
    if (maxDays >= 15) return "primary";
    return "warning";
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
        borderColor: "divider",
        borderRadius: 3,
        marginTop: "20px",
        backgroundColor: "rgba(16, 42, 75, 0.7)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
      }}
    >
      {(isLoading || deleteIsloading || addIsLoading || updateIsLoading) && (
        <Loader />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="white">
          Leave Types Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddLeaveType}
          sx={{
            background: "linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)",
            "&:hover": {
              background: "linear-gradient(90deg, #2c5fb3 0%, #00b7e6 100%)",
            },
          }}
        >
          Add Leave Type
        </Button>
      </Box>

      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: "rgba(16, 42, 75, 0.5)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Table
          sx={{
            "& .MuiTableCell-root": {
              color: "white",
              borderColor: "rgba(255,255,255,0.2)",
            },
            "& .MuiTableRow-root:hover": {
              backgroundColor: "rgba(255,255,255,0.05)",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Max Days</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveTypes.map((leaveType, index) => (
              <TableRow key={leaveType.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Typography fontWeight={500}>{leaveType.name}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${leaveType.max_days} days`}
                    color={getBadgeColor(leaveType.max_days)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton
                      sx={{
                        border: "1px solid rgba(0, 210, 255, 0.3)",
                        color: "#00d2ff",
                        "&:hover": {
                          backgroundColor: "rgba(0, 210, 255, 0.1)",
                        },
                      }}
                      onClick={() => handleEditLeaveType(leaveType)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      sx={{
                        border: "1px solid rgba(248, 113, 113, 0.3)",
                        color: "#f87171",
                        "&:hover": {
                          backgroundColor: "rgba(248, 113, 113, 0.1)",
                        },
                      }}
                      onClick={() => handleDeleteLeaveType(leaveType.id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {leaveTypes.length === 0 && (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography color="rgba(255,255,255,0.7)">
              No leave types found. Add a new leave type to get started.
            </Typography>
          </Box>
        )}
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background:
              "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
            color: "white",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1.3rem",
            fontWeight: 600,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "white",
          }}
        >
          {isEditing ? (
            <>
              <Edit fontSize="small" /> Edit Leave Type
            </>
          ) : (
            <>
              <Add fontSize="small" /> Add New Leave Type
            </>
          )}
        </DialogTitle>

        <DialogContent dividers sx={{ py: 3 }}>
          <Stack spacing={3} mt={1}>
            <TextField
              label="Leave Type Name"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter leave type name"
              error={Boolean(errors.name)}
              helperText={errors.name}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00d2ff",
                    boxShadow: "0 0 0 2px rgba(0,210,255,0.2)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": {
                    color: "#00d2ff",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "#ff6b6b",
                },
              }}
            />

            <TextField
              label="Maximum Days"
              type="number"
              fullWidth
              name="max_days"
              value={formData.max_days}
              onChange={handleInputChange}
              placeholder="Enter maximum days"
              error={Boolean(errors.max_days)}
              helperText={errors.max_days}
              InputProps={{
                inputProps: { min: 1 },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00d2ff",
                    boxShadow: "0 0 0 2px rgba(0,210,255,0.2)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-focused": {
                    color: "#00d2ff",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "#ff6b6b",
                },
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{ px: 3, py: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            startIcon={<Cancel />}
            sx={{
              borderRadius: 2,
              borderColor: "rgba(255,255,255,0.3)",
              color: "white",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.5)",
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<Save />}
            sx={{
              borderRadius: 2,
              background: "linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)",
              "&:hover": {
                background: "linear-gradient(90deg, #2c5fb3 0%, #00b7e6 100%)",
              },
            }}
          >
            {isEditing ? "Update" : "Add"} Leave Type
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LeaveTypesManager;
