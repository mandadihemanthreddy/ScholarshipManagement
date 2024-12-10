import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterUsername, setFilterUsername] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [status, setStatus] = useState('');
  const [remarks, setRemarks] = useState('');
  const [proofsDialogOpen, setProofsDialogOpen] = useState(false);
  const [uploadedText, setUploadedText] = useState(''); // Store extracted text
  const [file, setFile] = useState(null); // Store the file

  // Fetch applications on mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('https://scholarshipmanagementbackend-production.up.railway.app/api/scholarship/applications');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Filter applications by username
  const handleFilterChange = (e) => setFilterUsername(e.target.value);

  // Select application to view details and set status/remarks
  const handleSelectApplication = async (application) => {
    setSelectedApplication(application);
    setStatus(application.status || 'Pending');
    setRemarks(application.remarks || '');

    try {
      // Fetch the full application details including proofs
      const appResponse = await axios.get(`http://localhost:8080/api/scholarship/applications/${application.id}`);
      const proofsResponse = await axios.get(`http://localhost:8080/api/files/${application.username}`);

      // Set application data with proofs
      setSelectedApplication({
        ...appResponse.data,
        proofs: proofsResponse.data.reduce((acc, fileName) => {
          acc[fileName] = `http://localhost:8080/api/files/${application.username}/${fileName}`;
          return acc;
        }, {}),
      });
    } catch (error) {
      console.error('Error fetching application details and proofs:', error);
    }
  };

  // Update application status
  const handleStatusChange = async () => {
    if (!selectedApplication) return;

    try {
      await axios.put(
        `http://localhost:8080/api/scholarship/applications/${selectedApplication.id}`,
        null,
        {
          params: { status, remarks },
        }
      );
      alert('Application updated successfully!');
      setApplications((prev) =>
        prev.map((app) =>
          app.id === selectedApplication.id ? { ...app, status, remarks } : app
        )
      );
    } catch (err) {
      console.error('Error updating application:', err);
      alert('Failed to update application');
    }
  };

  // Filter applications based on username
  const filteredApplications = applications.filter(
    (application) =>
      filterUsername === '' ||
      (application.username &&
        application.username.toLowerCase().includes(filterUsername.toLowerCase()))
  );

  // Open proofs dialog
  const handleProofsDialogOpen = () => setProofsDialogOpen(true);
  const handleProofsDialogClose = () => setProofsDialogOpen(false);

  // Download proof file
  const downloadFile = (filePath) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop(); // Get the file name from the path
    link.click();
  };

  // Handle document upload
  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/upload-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadedText(response.data); // Set the extracted text
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadedText('Failed to extract text from the document.');
    }
  };

  // Render application details
  const renderApplicationDetails = (application) => {
    return Object.entries(application).map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return (
          <Grid item xs={12} key={key}>
            <Typography variant="body1">
              <strong>{key.replace(/([A-Z])/g, ' $1')}: </strong>
              {Object.entries(value).map(([subKey, subValue]) => (
                <span key={subKey}>
                  {subKey}: {subValue?.toString() || 'N/A'}{' '}
                </span>
              ))}
            </Typography>
          </Grid>
        );
      } else {
        return (
          <Grid item xs={12} key={key}>
            <Typography variant="body1">
              <strong>{key.replace(/([A-Z])/g, ' $1')}: </strong>
              {value?.toString() || 'N/A'}
            </Typography>
          </Grid>
        );
      }
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Scholarship Applications
      </Typography>

      <TextField
        label="Filter by Username"
        variant="outlined"
        fullWidth
        value={filterUsername}
        onChange={handleFilterChange}
        sx={{ mb: 2 }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Applications</Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {filteredApplications.map((application) => (
                <Grid item xs={12} key={application.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{application.fullName || 'No Name'}</Typography>
                      <Typography variant="body2">
                        Scholarship ID: {application.scholarshipEntity?.id || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        Status: {application.status || 'Pending'}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={() => handleSelectApplication(application)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          {selectedApplication ? (
            <Box>
              <Typography variant="h5" gutterBottom>
                Application Details
              </Typography>
              <Grid container spacing={2}>
                {renderApplicationDetails(selectedApplication)}
              </Grid>

              <FormControl fullWidth sx={{ my: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Accepted">Accepted</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Remarks"
                variant="outlined"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />

              <Button variant="contained" color="primary" onClick={handleStatusChange}>
                Update Application Status
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={handleProofsDialogOpen}
              >
                View Proofs
              </Button>
            </Box>
          ) : (
            <Typography variant="h6">Select an application to view details</Typography>
          )}

          {/* Document upload section */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Upload Document (e.g., Aadhar proof)</Typography>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*,.pdf"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFileUpload}
              sx={{ mt: 2 }}
            >
              Upload & Extract Text
            </Button>

            {uploadedText && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Extracted Text:</Typography>
                <Typography>{uploadedText}</Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      <Dialog open={proofsDialogOpen} onClose={handleProofsDialogClose} fullWidth>
        <DialogTitle>Proof Documents</DialogTitle>
        <DialogContent>
          {selectedApplication?.proofs && Object.keys(selectedApplication.proofs).length > 0 ? (
            <Grid container spacing={2}>
              {Object.entries(selectedApplication.proofs).map(([proofType, filePath]) => (
                <Grid item xs={12} sm={6} key={proofType}>
                  <Typography>
                    <strong>{proofType}:</strong>
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => downloadFile(filePath)}
                  >
                    Download
                  </Button>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No proofs available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProofsDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminApplications;
