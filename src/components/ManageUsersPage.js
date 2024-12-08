import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Box, TextField, Card, CardContent, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useFormik } from 'formik'; // Import useFormik here
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch users on page load
  useEffect(() => {
    axios.get('http://localhost:8080/api/admin/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Formik for form handling without validations
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
      phoneNumber: '',
      Date_of_birth: '', // Changed from dob to Date_of_birth
      aadhar_number: '', // Changed from aadhar to aadhar_number
      role: '',
      gender: '', // added gender field
    },
    onSubmit: (values) => {
      if (isEditing) {
        // Update user
        axios.put(`http://localhost:8080/api/admin/users/${selectedUser.id}`, values)
          .then(response => {
            const updatedUsers = users.map(user => user.id === response.data.id ? response.data : user);
            setUsers(updatedUsers);
            setOpenDialog(false);
          })
          .catch(error => {
            console.error('Error updating user:', error);
          });
      } else {
        // Add new user
        axios.post('http://localhost:8080/api/admin/users', values)
          .then(response => {
            setUsers([...users, response.data]);
            setOpenDialog(false);
          })
          .catch(error => {
            console.error('Error adding user:', error);
          });
      }
    },
  });

  // Handle open/close dialog
  const handleOpenDialog = (user = null) => {
    if (user) {
      setIsEditing(true);
      formik.setValues(user);
      setSelectedUser(user);
    } else {
      setIsEditing(false);
      formik.resetForm();
    }
    setOpenDialog(true);
  };

  // Handle close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle delete user
  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:8080/api/admin/users/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>

      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Add New User
      </Button>

      <Grid container spacing={2} mt={3}>
        {users.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Phone: {user.phoneNumber}</Typography>
                <Typography>Role: {user.role}</Typography>
                <Typography>DOB: {user.Date_of_birth}</Typography> {/* Updated for consistency */}
                <Typography>Gender: {user.gender}</Typography>

                <Box mt={2}>
                  <IconButton color="primary" onClick={() => handleOpenDialog(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for adding or editing users */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* Username */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* Phone Number */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* Date of Birth */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  name="date_of_birth" // Changed from dob to Date_of_birth
                  value={formik.values.Date_of_birth}
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Aadhar Number */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Aadhar Number"
                  name="aadhar_number" // Changed from aadhar to aadhar_number
                  value={formik.values.aadhar_number}
                  onChange={formik.handleChange}
                />
              </Grid>

              {/* Gender */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Role */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="Admin">ADMIN</MenuItem>
                    <MenuItem value="User">USER</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {isEditing ? 'Update' : 'Add'} User
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ManageUsersPage;
