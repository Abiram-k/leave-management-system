import {
  Button,
  Container,
  Typography,
  Stack,
  Paper,
  Box,
  Avatar,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { Loader } from "@/components/spinner";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { isLoading, logout } = useLogout("employee");

  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      {isLoading && <Loader />}
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            backdropFilter: "blur(16px)",
            backgroundColor: "rgba(16, 42, 55, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
            overflow: "hidden",
            position: "relative",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 6,
              background: "rgba(16, 56, 55, .9)",
            },
          }}
        >
          <Box textAlign="center" mb={4}>
            <Avatar
              src="https://mui.com/static/images/avatar/1.jpg"
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
                bgcolor: "primary.main",
                fontSize: "2rem",
              }}
            />
            {/* AE
            </Avatar> */}

            <Typography
              variant="h5"
              fontWeight={700}
              color="white"
              gutterBottom
            >
              Welcome Back!
            </Typography>

            <Typography variant="body1" color="gray">
              Manage your profile and leave applications
            </Typography>
          </Box>

          <Stack spacing={2} mt={4}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<CalendarTodayIcon />}
              onClick={() => navigate("/leaves")}
              sx={{
                py: 1.8,
                borderRadius: 2.5,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                letterSpacing: 0.5,
                background: "linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #2c5fb3 0%, #00b7e6 100%)",
                  boxShadow: "0 4px 12px rgba(0, 210, 255, 0.2)",
                },
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(58, 123, 213, 0.3)",
              }}
            >
              My Leave Applications
            </Button>
            {/* Secondary Button - Profile Settings */}
            <Button
              variant="outlined"
              fullWidth
              size="large"
              startIcon={<AccountCircleIcon />}
              onClick={() => navigate("/profile")}
              sx={{
                py: 1.8,
                borderRadius: 2.5,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                letterSpacing: 0.5,
                color: "#00d2ff",
                borderColor: "rgba(0, 210, 255, 0.5)",
                "&:hover": {
                  backgroundColor: "rgba(0, 210, 255, 0.08)",
                  borderColor: "#00d2ff",
                  boxShadow: "0 2px 8px rgba(0, 210, 255, 0.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Profile Settings
            </Button>
            <Divider
              sx={{
                my: 3,
                color: "rgba(255, 255, 255, 0.5)",
                "&::before, &::after": {
                  borderColor: "rgba(255, 255, 255, 0.12)",
                },
                fontSize: "0.875rem",
                letterSpacing: "0.5px",
              }}
            >
              or
            </Divider>
            <Button
              variant="text"
              fullWidth
              size="large"
              startIcon={<ExitToAppIcon />}
              onClick={handleLogout}
              sx={{
                py: 1.5,
                color: "error.main",
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Sign Out
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default EmployeeDashboard;
