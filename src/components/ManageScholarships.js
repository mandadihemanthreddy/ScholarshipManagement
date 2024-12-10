import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageScholarships = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentScholarship, setCurrentScholarship] = useState({
    id: null, // Ensure there's an ID for editing
    name: '',
    description: '',
    eligibility: '',
    deadline: '',
    amount: 0,
    type: ''
  });
  const [error, setError] = useState("");  // For displaying error messages

  // Fetch scholarships on component mount
  useEffect(() => {
    axios.get('https://scholarshipmanagementbackend-production.up.railway.app/api/admin/scholarships')
      .then(response => {
        setScholarships(response.data);
      })
      .catch(error => {
        console.error('Error fetching scholarships:', error);
        setError('Failed to load scholarships. Please try again later.');
      });
  }, []);

  // Handle adding or updating a scholarship
  const handleSaveScholarship = () => {
    if (currentScholarship.id) {
      // Update scholarship
      axios.put(`https://scholarshipmanagementbackend-production.up.railway.app/api/admin/scholarships/${currentScholarship.id}`, currentScholarship)
        .then(response => {
          setScholarships(scholarships.map(scholarship => 
            scholarship.id === currentScholarship.id ? response.data : scholarship
          ));
          setIsEditing(false);
          resetForm();
        })
        .catch(error => {
          console.error('Error updating scholarship:', error);
          setError('Failed to update scholarship. Please try again.');
        });
    } else {
      // Add new scholarship
      axios.post('https://scholarshipmanagementbackend-production.up.railway.app/api/admin/scholarships', currentScholarship)
        .then(response => {
          setScholarships([...scholarships, response.data]);
          setIsEditing(false);
          resetForm();
        })
        .catch(error => {
          console.error('Error adding scholarship:', error);
          setError('Failed to add scholarship. Please try again.');
        });
    }
  };

  // Handle editing an existing scholarship
  const handleEditScholarship = (scholarship) => {
    setCurrentScholarship(scholarship);
    setIsEditing(true);
    setError("");  // Clear any previous errors
  };

  // Handle deleting a scholarship
  const handleDeleteScholarship = (id) => {
    axios.delete(`https://scholarshipmanagementbackend-production.up.railway.app/api/admin/scholarships/${id}`)
      .then(() => {
        setScholarships(scholarships.filter(scholarship => scholarship.id !== id));
      })
      .catch(error => {
        console.error('Error deleting scholarship:', error);
        setError('Failed to delete scholarship. Please try again.');
      });
  };

  // Handle form input changes
  const handleChange = (e) => {
    setCurrentScholarship({
      ...currentScholarship,
      [e.target.name]: e.target.value
    });
  };

  // Reset form state after adding/editing a scholarship
  const resetForm = () => {
    setCurrentScholarship({
      id: null,
      name: '',
      description: '',
      eligibility: '',
      deadline: '',
      amount: 0,
      type: ''
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Scholarships
      </Typography>

      {/* Button to trigger the form for adding a new scholarship */}
      <Button variant="contained" onClick={() => setIsEditing(true)} sx={{ mb: 3 }}>
        Add New Scholarship
      </Button>

      {/* Displaying error if there is any */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Form for adding or editing scholarship */}
      {isEditing && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {currentScholarship.id ? 'Edit Scholarship' : 'Add New Scholarship'}
          </Typography>
          <TextField
            label="Scholarship Name"
            variant="outlined"
            fullWidth
            name="name"
            value={currentScholarship.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            value={currentScholarship.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Eligibility"
            variant="outlined"
            fullWidth
            name="eligibility"
            value={currentScholarship.eligibility}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {/* Simple date input (HTML5 date picker) */}
          <TextField
            label="Deadline"
            variant="outlined"
            fullWidth
            name="deadline"
            type="date"
            value={currentScholarship.deadline}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,  // This ensures that the label appears correctly
            }}
          />

          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            name="amount"
            value={currentScholarship.amount}
            onChange={handleChange}
            sx={{ mb: 2 }}
            type="number"
          />
          <TextField
            label="Type"
            variant="outlined"
            fullWidth
            name="type"
            value={currentScholarship.type}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" onClick={handleSaveScholarship}>
            {currentScholarship.id ? 'Update Scholarship' : 'Add Scholarship'}
          </Button>
        </Box>
      )}

      {/* Displaying Scholarships */}
      <Grid container spacing={3}>
        {scholarships.map(scholarship => (
          <Grid item xs={12} sm={6} md={4} key={scholarship.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{scholarship.name}</Typography>
                <Typography variant="body2" color="textSecondary">{scholarship.description}</Typography>
                <Typography variant="body2">Eligibility: {scholarship.eligibility}</Typography>
                <Typography variant="body2">Deadline: {scholarship.deadline}</Typography>
                <Typography variant="body2">Amount: {scholarship.amount}</Typography>
                <Typography variant="body2">Type: {scholarship.type}</Typography>

                <Button variant="contained" onClick={() => handleEditScholarship(scholarship)} sx={{ mt: 2 }}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDeleteScholarship(scholarship.id)} sx={{ mt: 2, ml: 1 }}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ManageScholarships;
