import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";

import {
  DateRange as DateRangeIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import type { LeaveFormField } from "@/types/form.type";
import { LeaveSchema } from "../schemas/leave.schema";

type LeaveApplicationModalProps = {
  type: "add" | "edit";
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
};

const LeaveApplicationModal = ({
  type,
  open,
  onClose,
  onSubmit,
  isLoading,
}: LeaveApplicationModalProps) => {
  const formInitialValue: LeaveFormField = {
    leaveType: 0,
    startDate: new Date(),
    endDate: new Date(),
    reason: "",
  };

  const leaveTypes = [
    { value: 1, label: "Annual Leave" },
    { value: 2, label: "Sick Leave" },
    { value: 3, label: "Maternity/Paternity" },
    { value: 4, label: "Unpaid Leave" },
  ];

  const handleFormSubmit = (data: LeaveFormField) => {
    onSubmit(data);
    console.log("Submitted data: ", data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "500px" },
          bgcolor: "rgba(16, 42, 75, 0.95)",
          backdropFilter: "blur(12px)",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(0, 210, 255, 0.2)",
          p: 4,
          outline: "none",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold" color="white">
            <DateRangeIcon
              sx={{ mr: 1, verticalAlign: "middle", color: "white" }}
            />
            {type == "add" ? "Apply for Leave" : "Edit Leave"}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "rgba(255,255,255,0.7)" }}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />
        <Formik
          initialValues={formInitialValue}
          validationSchema={LeaveSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            handleSubmit,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  select
                  label="Leave Type"
                  name="leaveType"
                  onChange={handleChange}
                  helperText={touched["leaveType"] && errors["leaveType"]}
                  error={Boolean(touched["leaveType"] && errors["leaveType"])}
                  placeholder="Select leave type"
                  onBlur={handleBlur}
                  InputProps={{
                    startAdornment: (
                      <CategoryIcon
                        sx={{ mr: 1, opacity: 0.7, color: "white" }}
                      />
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      borderColor: "rgba(16, 42, 75, 0.9)",
                      color: "white",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused": {
                        borderColor: "#00d2ff",
                        boxShadow: "0 0 0 2px rgba(0,210,255,0.2)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255,255,255,0.8)",
                      "&.Mui-focused": {
                        color: "#00d2ff",
                      },
                    },
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                    },
                    "& .MuiSelect-icon": {
                      color: "white",
                    },
                    "& .MuiFormHelperText-root": {
                      color: errors["leaveType"]
                        ? "#ff6b6b"
                        : "rgba(255,255,255,0.7)",
                    },
                  }}
                >
                  {leaveTypes.map((type) => (
                    <MenuItem
                      key={type.value}
                      value={type.value}
                      sx={{
                        backgroundColor: "gray",
                        borderBottom: "1px solid black",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(50, 50, 50, 0.9)",
                        },
                      }}
                    >
                      <Chip
                        label={type.label}
                        size="small"
                        sx={{
                          mr: 1,
                          color: "white",
                          bgcolor: "rgba(0, 0, 0, 0.7)",
                        }}
                      />
                    </MenuItem>
                  ))}
                </TextField>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    type="date"
                    label="Start Date"
                    name="startDate"
                    error={Boolean(touched["startDate"] && errors["startDate"])}
                    placeholder={"Select Start date"}
                    onChange={handleChange}
                    helperText={
                      touched["startDate"] &&
                      typeof errors["startDate"] === "string"
                        ? errors["startDate"]
                        : ""
                    }
                    onBlur={handleBlur}
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "rgba(255,255,255,0.8)" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        borderColor: "rgba(255,255,255,0.3)",
                        color: "white",
                        "&:hover": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                        "&.Mui-focused": {
                          borderColor: "#00d2ff",
                          boxShadow: "0 0 0 2px rgba(0,210,255,0.2)",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                      "& .MuiFormHelperText-root": {
                        color: errors["startDate"]
                          ? "#ff6b6b"
                          : "rgba(255,255,255,0.7)",
                      },
                    }}
                    fullWidth
                  />
                  <TextField
                    type="date"
                    label="End Date"
                    name="endDate"
                    error={Boolean(touched["endDate"] && errors["endDate"])}
                    placeholder={"Select end date"}
                    onChange={handleChange}
                    helperText={
                      touched["endDate"] &&
                      typeof errors["endDate"] === "string"
                        ? errors["endDate"]
                        : ""
                    }
                    onBlur={handleBlur}
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "rgba(255,255,255,0.8)" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        borderColor: "rgba(255,255,255,0.3)",
                        color: "white",
                        "&:hover": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                        "&.Mui-focused": {
                          borderColor: "#00d2ff",
                          boxShadow: "0 0 0 2px rgba(0,210,255,0.2)",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                      "& .MuiFormHelperText-root": {
                        color: errors["endDate"]
                          ? "#ff6b6b"
                          : "rgba(255,255,255,0.7)",
                      },
                    }}
                    fullWidth
                  />
                </Stack>

                {/* Reason */}
                <TextField
                  label="Reason"
                  name="reason"
                  onChange={handleChange}
                  error={Boolean(touched["reason"] && errors["reason"])}
                  helperText={touched["reason"] && errors["reason"]}
                  placeholder="Enter reason"
                  onBlur={handleBlur}
                  multiline
                  rows={4}
                  InputLabelProps={{
                    style: { color: "rgba(255,255,255,0.8)" },
                  }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "white",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                      "&.Mui-focused": {
                        borderColor: "#00d2ff",
                        boxShadow: "0 0 0 2px rgba(0,210,255,0.2)",
                      },
                    },
                    "& .MuiFormHelperText-root": {
                      color: errors["reason"]
                        ? "#ff6b6b"
                        : "rgba(255,255,255,0.7)",
                    },
                  }}
                />
              </Stack>

              <Divider
                sx={{ borderColor: "rgba(255,255,255,0.1)", mt: 3, mb: 2 }}
              />

              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  onClick={onClose}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SendIcon sx={{ color: "white" }} />}
                  disabled={isSubmitting || isLoading}
                  sx={{
                    borderRadius: 2,
                    color: "white",
                    background:
                      "linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #2c5fb3 0%, #00b7e6 100%)",
                    },
                  }}
                >
                  {isSubmitting || isLoading ? "Submiting..." : "Submit"}
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default LeaveApplicationModal;
