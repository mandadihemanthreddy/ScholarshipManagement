import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  CssBaseline,
  Typography,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [floatingScholarships, setFloatingScholarships] = useState([]);
  const [applicationData, setApplicationData] = useState({
    accepted: 3,
    pending: 2,
    rejected: 1,
  });

  // Fetch newly added scholarships from the backend
  useEffect(() => {
    const fetchNewScholarships = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/scholarships");
        const scholarships = response.data;
  
        // Sort scholarships by ID in descending order to show the newest ones
        const sortedScholarships = scholarships.sort((a, b) => b.id - a.id);
        setFloatingScholarships(sortedScholarships);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      }
    };
  
    fetchNewScholarships();
  }, []);

  // Pie chart data
  const pieData = {
    labels: ["Accepted", "Pending", "Rejected"],
    datasets: [
      {
        data: [
          applicationData.accepted,
          applicationData.pending,
          applicationData.rejected,
        ],
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
      },
    ],
  };

  // Logout function
  const handleLogout = () => {
    // Clear session information
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");

    // Redirect to the index page (login page)
    navigate("/", { replace: true });

    // Reload the page to reset the UI state
    window.location.reload();
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
  <CssBaseline />

  {/* Sidebar */}
  <Box
    sx={{
      width: 240,
      backgroundColor: "#12232E",
      color: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start", // Align from the top
    }}
  >
    {/* Navigation Links */}
    <Box sx={{ paddingTop: "16px" }}>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          padding: "16px 0",
          fontWeight: "bold",
          backgroundColor: "#203647",
          fontSize: "18px",
          letterSpacing: "1px",
        }}
      >
        Scholarship Management System
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/scholarships">
            <ListItemIcon>
              <SchoolIcon sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="View Schemes" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/application-history">
            <ListItemIcon>
              <HistoryIcon sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="Application History" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/profile">
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/settings">
            <ListItemIcon>
              <SettingsIcon sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>

    {/* Logout Button */}
    <Box sx={{ marginTop: "auto" }}>
      <Divider sx={{ backgroundColor: "#CCCCCC" }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  </Box>

  {/* Main Content Area */}
  <Box
    sx={{
      flexGrow: 1,
      backgroundColor: "#EEEEEE",
      padding: "24px",
      overflow: "auto",
    }}
  >
    <Typography variant="h4" gutterBottom>
      Welcome to Your Dashboard
    </Typography>
    <Typography variant="body1" gutterBottom>
      Use the navigation menu to explore available scholarships, check your
      application history, update your profile, or modify settings.
    </Typography>

    {/* Example Button */}
    <Button
      variant="contained"
      color="primary"
      sx={{ marginTop: "16px" }}
      component={Link}
      to="/scholarships"
    >
      View Scholarships
    </Button>
  </Box>
</Box>

  );
};

export default UserDashboard;
