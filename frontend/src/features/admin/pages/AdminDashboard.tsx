import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
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

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Logout as LogoutIcon,
  ListAlt as LeaveListIcon,
} from "@mui/icons-material";
import type { EmployeeFormType } from "@/types/form.type";
import AddOrEditEmployeeModal from "../components/AddOrEditEmployeeModal";
import Pagination from "@/components/Pagination";
import Filter from "../components/Filter";
import { useDebounce } from "../hooks/useDebounce";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { Loader } from "@/components/spinner";
import type { Employee } from "@/types/employee.type";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAddEmployee } from "../hooks/useAddEmployee";
import { useUpdateEmployee } from "../hooks/useUpdateEmployee";
import { useDeleteEmployee } from "../hooks/useDeleteEmployee";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { fetchEmployees, isLoading } = useFetchEmployees();
  const { addEmployees, isLoading: addUserLoading } = useAddEmployee();
  const { isLoading: updateEmployeeLoading, updateEmployees } =
    useUpdateEmployee();
  const { deleteEmployees, isLoading: deleteEmpLoading } = useDeleteEmployee();
  const { isLoading: isLogoutLoading, logout } = useLogout("admin");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 1;
  const [debounceSearchValue] = useDebounce({ searchTerm, delay: 2000 });
  const navigate = useNavigate();

  const [form, setForm] = useState<EmployeeFormType>({
    id: 0,
    name: "",
    email: "",
  });

  useEffect(() => {
    const loadEmployees = async () => {
      const response = await fetchEmployees(
        debounceSearchValue,
        currentPage,
        itemsPerPage
      );
      console.log(response?.data);
      if (response) {
        setEmployees(response.data);
        setPageCount(response.totalPages);
      }
    };

    loadEmployees();
  }, [currentPage, debounceSearchValue]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const handleAddOrEdit = async (data: EmployeeFormType) => {
    console.log("DATA: ", data);
    if (editIndex !== null) {
      const updated = [...employees];
      const indexToUpdate = updated.findIndex((emp) => emp.id === editIndex);

      if (indexToUpdate !== -1) {
        updated[indexToUpdate] = { ...updated[indexToUpdate], ...data };
        const udateData = {
          id: data.id,
          name: data.name,
          email: data.email,
        };
        const response = await updateEmployees(editIndex, udateData);
        if (response?.success) {
          toast.success("Employee updated successfully");
          setEmployees(updated);
          setEditIndex(null);
        }
      }
    } else {
      const response = await addEmployees(data);
      if (response?.success) {
        setEmployees([...employees, data]);
      }
    }
    setForm({ name: "", email: "", id: 0 });
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;
    const response = await deleteEmployees(id);
    if (response?.success) {
      const filteredEmployee = employees.filter((emp) => emp.id !== id);
      setEmployees(filteredEmployee);
      toast.success("Employee deleted successfully");
    }
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
      {(isLoading ||
        isLogoutLoading ||
        addUserLoading ||
        deleteEmpLoading ||
        updateEmployeeLoading) && <Loader />}
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
          {/* <Button
            variant="contained"
            onClick={() => (location.href = "/admin/leave-types")}
            sx={{
              background: "linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)",
              "&:hover": {
                background: "linear-gradient(90deg, #2c5fb3 0%, #00b7e6 100%)",
              },
            }}
          >
            Leave Types
          </Button> */}
          <Button
            variant="contained"
            onClick={() => (location.href = "/admin/leave-requests")}
            sx={{
              background: "linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)",
              "&:hover": {
                background: "linear-gradient(90deg, #2c5fb3 0%, #00b7e6 100%)",
              },
            }}
          >
            Leave Requests
          </Button>
          <Button
            variant="contained"
            onClick={() => (location.href = "/admin/leave-types-management")}
            sx={{
              background: "linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)",
              "&:hover": {
                background: "linear-gradient(90deg, #2c5fb3 0%, #00b7e6 100%)",
              },
            }}
          >
            Manage Leave Types
          </Button>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.3)",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.5)",
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            Logout
          </Button>
        </Stack>
      </Box>

      <Filter
        filterRole={filterRole}
        searchTerm={searchTerm}
        setFilterRole={setFilterRole}
        setSearchTerm={setSearchTerm}
        isSearchNeed={true}
        isFilterNeed={false}
      />

      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: "rgba(16, 42, 75, 0.5)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
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
            Employees ({employees.length})
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setEditIndex(null);
              setForm({
                id: 0,
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
              setOpen(true);
            }}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.3)",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.5)",
                backgroundColor: "rgba(255,255,255,0.08)",
              },
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
              <TableCell>Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp, index) => (
              <TableRow key={`${emp.name}_${index}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>
                  <Chip
                    label={emp.role || "employee"}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.1)",
                      color: "white",
                      fontWeight: 500,
                    }}
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
                      onClick={() => {
                        setForm({
                          id: emp.id,
                          name: emp.name,
                          email: emp.email,
                          password: "",
                          confirmPassword: "",
                        });
                        setEditIndex(emp.id);
                        setOpen(true);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      sx={{
                        border: "1px solid rgba(248, 113, 113, 0.3)",
                        color: "#f87171",
                        "&:hover": {
                          backgroundColor: "rgba(248, 113, 113, 0.1)",
                        },
                      }}
                      onClick={() => handleDelete(emp.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>

                    <Button
                      variant="outlined"
                      startIcon={<LeaveListIcon />}
                      size="small"
                      onClick={() =>
                        navigate(`/admin/employee-leaves/${emp.id}`)
                      }
                      sx={{
                        color: "white",
                        borderColor: "rgba(255,255,255,0.3)",
                        "&:hover": {
                          borderColor: "rgba(255,255,255,0.5)",
                          backgroundColor: "rgba(255,255,255,0.08)",
                        },
                      }}
                    >
                      Leaves
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {employees.length === 0 && (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography color="rgba(255,255,255,0.7)">
              No employees found. Try changing your search or filter criteria.
            </Typography>
          </Box>
        )}

        {pageCount > 1 && (
          <Pagination
            onPageChange={setCurrentPage}
            totalPages={pageCount || 1}
          />
        )}
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
