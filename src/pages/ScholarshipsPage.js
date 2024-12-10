import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Alert,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Box,
  Container,
  Avatar,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const ScholarshipsPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu
  const [clickedScholarship, setClickedScholarship] = useState(null); // To track clicked scholarship
  const navigate = useNavigate();

  // Fetch scholarships from the backend
  useEffect(() => {
    axios
      .get("https://scholarshipmanagementbackend-production.up.railway.app/api/users/scholarships")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setScholarships(response.data);
        } else {
          setErrorMessage("Error: Scholarships data is not in the correct format.");
        }
      })
      .catch((error) => {
        setErrorMessage("Error fetching scholarships: " + error.message);
      });
  }, []);

  // Handle search functionality
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filtered scholarships based on the search term
  const filteredScholarships = scholarships.filter((scholarship) =>
    Object.values(scholarship).some((value) =>
      String(value).toLowerCase().includes(searchTerm)
    )
  );

  // Handle sort functionality
  const handleSort = (criteria) => {
    const sortedScholarships = [...filteredScholarships].sort((a, b) => {
      if (criteria === "amount") return a.amount - b.amount;
      if (criteria === "deadline") return new Date(a.deadline) - new Date(b.deadline);
      return 0;
    });
    setScholarships(sortedScholarships);
    setFilterAnchorEl(null); // Close the filter menu after sorting
  };

  // Handle apply button click: Pass the scholarship name to the form page
  const handleApplyClick = (scholarship) => {
    navigate("/apply", { state: { scholarshipId: scholarship.id } });
  };

  // Handle dropdown menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle scholarship click: Hold the card for a brief period (simulate a gap)
  const handleScholarshipClick = (scholarship) => {
    setClickedScholarship(scholarship.id); // Set the clicked scholarship ID
    setTimeout(() => {
      setClickedScholarship(null); // Release back after a brief delay (2 seconds)
    }, 2000); // Hold for 2 seconds
  };

  return (
    <div style={{ border: "5px solid #1976d2", padding: "20px", borderRadius: "10px" }}>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Scholarship Portal
          </Typography>

          <IconButton edge="end" color="inherit" onClick={handleMenuClick}>
            <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate("/user-dashboard")}>
              <HomeIcon style={{ marginRight: "10px" }} />
              Home
            </MenuItem>
            <MenuItem onClick={() => navigate("/profile")}>
              <PersonIcon style={{ marginRight: "10px" }} />
              Profile
            </MenuItem>
            <MenuItem onClick={() => { /* handle logout logic */ }}>
              <LogoutIcon style={{ marginRight: "10px" }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container>
        <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
          Scholarships
        </Typography>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        {/* Search Field */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <TextField
            label="Search Scholarships"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ flex: 1, marginRight: "10px" }}
          />

          {/* Filter Button */}
          <IconButton
            aria-controls="filter-menu"
            aria-haspopup="true"
            onClick={(e) => setFilterAnchorEl(e.currentTarget)}
          >
            <FilterListIcon />
          </IconButton>
          <Menu
            id="filter-menu"
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={() => setFilterAnchorEl(null)}
          >
            <MenuItem onClick={() => handleSort("amount")}>Sort by Amount</MenuItem>
            <MenuItem onClick={() => handleSort("deadline")}>Sort by Deadline</MenuItem>
          </Menu>
        </div>

        {/* Scholarships Grid */}
        <Grid container spacing={3} justifyContent="center">
          {filteredScholarships.length > 0 ? (
            filteredScholarships.map((scholarship) => (
              <Grid item xs={12} sm={6} md={4} key={scholarship.id}>
                <Card
                  sx={{
                    border: "2px solid #ddd", // Border for the card
                    height: "200px", // Set a fixed height for all cards
                    overflow: "hidden", // Prevent content overflow
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)", // Zoom effect on hover
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                      height: "auto", // Expand on hover
                    },
                    backgroundColor: clickedScholarship === scholarship.id ? "#f5f5f5" : "transparent", // Change background when clicked
                  }}
                  onClick={() => handleScholarshipClick(scholarship)}
                >
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {scholarship.name}
                    </Typography>
                    <Typography color="textSecondary">{scholarship.deadline}</Typography>
                  </CardContent>

                  {/* Scholarship Details Display on Hover */}
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      opacity: 0, // Initially hidden
                      transition: "opacity 0.3s ease",
                      padding: "0 16px",
                      "&:hover": {
                        opacity: 1, // Display details on hover
                      },
                    }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      {scholarship.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Amount: ${scholarship.amount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Type: {scholarship.type}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Eligibility: {scholarship.eligibility}
                    </Typography>

                    {/* Apply Button Always Visible and Centered */}
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        alignSelf: "center", // Center the button
                        marginTop: "auto", // Ensure the button is at the bottom
                        width: "100%",
                      }}
                      onClick={() => handleApplyClick(scholarship)}
                    >
                      Apply
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="textSecondary" align="center" style={{ width: "100%" }}>
              No scholarships available
            </Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default ScholarshipsPage;
