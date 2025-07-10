import { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import type { EmployeeFormType } from "@/types/form.type";
import AddOrEditEmployeeModal from "../components/AddOrEditEmployeeModal";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
  ]);

  const [form, setForm] = useState<EmployeeFormType>({
    name: "",
    email: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const handleAddOrEdit = (data: EmployeeFormType) => {
    if (editIndex !== null) {
      const updated = [...employees];
      updated[editIndex] = { ...updated[editIndex], ...data };
      setEmployees(updated);
      setEditIndex(null);
    } else {
      setEmployees([...employees, data]);
    }
    setForm({ name: "", email: "" });
    setOpen(false);
  };

  const handleDelete = (index: number) => {
    const filtered = employees.filter((_, i) => i !== index);
    setEmployees(filtered);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="white">
          Admin Dashboard
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => (location.href = "/admin/leave-types")}
          >
            Leave Types
          </Button>
          <Button
            variant="contained"
            onClick={() => (location.href = "/admin/leave-requests")}
          >
            Leave Requests
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          backgroundColor: "rgba(16, 42, 75, 0.7)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.06)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={600} color="white">
            Employees
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setEditIndex(null);
              setOpen(true);
            }}
          >
            Add Employee
          </Button>
        </Box>

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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp, index) => (
              <TableRow key={`${emp.name}_${index}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setForm({
                        name: emp.name,
                        email: emp.email,
                        password: "",
                        confirmPassword: "",
                      });
                      setEditIndex(index);
                      setOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <AddOrEditEmployeeModal
        editIndex={editIndex}
        form={form}
        onSubmit={handleAddOrEdit}
        open={open}
        setForm={setForm}
        setOpen={setOpen}
      />
    </Container>
  );
};

export default AdminDashboard;
