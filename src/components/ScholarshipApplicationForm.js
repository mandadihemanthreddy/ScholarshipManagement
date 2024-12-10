import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Grid, Box, MenuItem, Select, InputLabel, FormControl, Typography, Paper } from "@mui/material";

const ScholarshipApplicationForm = () => {
  const location = useLocation();
  const scholarshipId = location.state?.scholarshipId;

  // State variables for form fields
  const [currentStep, setCurrentStep] = useState(1);
  const [proofOfCitizenship, setProofOfCitizenship] = useState(null);
  const [proofOfStudying, setProofOfStudying] = useState(null);
  const [proofOfFinancial, setProofOfFinancial] = useState(null);
  const [proofOfMerits, setProofOfMerits] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Address and Academic Information States
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [mandal, setMandal] = useState("");
  const [village, setVillage] = useState("");
  const [addressLine1, setAddressLine1] = useState("");

  // Academic Information States
  const [studyType, setStudyType] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [classStudying, setClassStudying] = useState("");
  const [schoolGPA, setSchoolGPA] = useState("");

  const [collegeName, setCollegeName] = useState("");
  const [collegeCourse, setCollegeCourse] = useState("");
  const [collegeYear, setCollegeYear] = useState("");
  const [collegeGPA, setCollegeGPA] = useState("");

  const [universityName, setUniversityName] = useState("");
  const [coursePursuing, setCoursePursuing] = useState("");
  const [universityYear, setUniversityYear] = useState("");
  const [universityGPA, setUniversityGPA] = useState("");
  const [specialMerits, setSpecialMerits] = useState("");

  // Financial Information
  const [bankName, setBankName] = useState("");
  const [annualFamilyIncome, setAnnualFamilyIncome] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankIFSCCode, setBankIFSCCode] = useState("");

  // Scholarship-Specific Information
  const [purposeOfApplying, setPurposeOfApplying] = useState("");
  const [skillsOrAchievements, setSkillsOrAchievements] = useState("");
  const [scholarshipName, setScholarshipName] = useState("");

  // Fetch username from localStorage
  const username = localStorage.getItem("username");

  // File upload handler
  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!scholarshipId || !username) {
      setError("Scholarship ID or Username is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("scholarshipId", scholarshipId);
    formData.append("addressLine1", addressLine1);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("mandal", mandal);
    formData.append("village", village);

    formData.append("studyType", studyType);
    formData.append("schoolName", schoolName);
    formData.append("classStudying", classStudying);
    formData.append("schoolGPA", schoolGPA);
    formData.append("collegeName", collegeName);
    formData.append("collegecourse", collegeCourse);
    formData.append("collegeYear", collegeYear);
    formData.append("collegeGPA", collegeGPA);
    formData.append("universityName", universityName);
    formData.append("coursePursuing", coursePursuing);
    formData.append("universityYear", universityYear);
    formData.append("universityGPA", universityGPA);
    formData.append("specialMerits", specialMerits);
    formData.append("bankName", bankName);
    formData.append("annualFamilyIncome", annualFamilyIncome);
    formData.append("bankAccountNumber", bankAccountNumber);
    formData.append("bankIFSCCode", bankIFSCCode);
    formData.append("purposeOfApplying", purposeOfApplying);
    formData.append("skillsOrAchievements", skillsOrAchievements);
    formData.append("scholarshipName", scholarshipName);

    // File uploads
    formData.append("proofOfCitizenship", proofOfCitizenship);
    formData.append("proofOfStudying", proofOfStudying);
    formData.append("proofOfFinancial", proofOfFinancial);
    formData.append("proofOfMerits", proofOfMerits);

    try {
      const response = await axios.post("https://scholarshipmanagementbackend-production.up.railway.app/api/scholarship/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        setSuccessMessage("Application submitted successfully!");
      }
    } catch (error) {
      setError("Error submitting application: " + (error.response?.data?.message || error.message));
    }
  };

  // Step Navigation
  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Scholarship Application
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Step 1: Address Information */}
        {currentStep === 1 && (
          <Paper sx={{ padding: 3, marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>
              Address Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField label="Country" fullWidth value={country} onChange={(e) => setCountry(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="State" fullWidth value={state} onChange={(e) => setState(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="City" fullWidth value={city} onChange={(e) => setCity(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Mandal" fullWidth value={mandal} onChange={(e) => setMandal(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Village" fullWidth value={village} onChange={(e) => setVillage(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Address Line" fullWidth value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Step 2: Academic Information */}
        {currentStep === 2 && (
          <Paper sx={{ padding: 3, marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>
              Academic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Study Type</InputLabel>
                  <Select value={studyType} onChange={(e) => setStudyType(e.target.value)}>
                    <MenuItem value="School">School</MenuItem>
                    <MenuItem value="College">College</MenuItem>
                    <MenuItem value="University">University</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Render academic details conditionally based on study type */}
              {studyType === "School" && (
                <>
                  <Grid item xs={6}>
                    <TextField label="School Name" fullWidth value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Class Studying" fullWidth value={classStudying} onChange={(e) => setClassStudying(e.target.value)} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="School GPA" fullWidth value={schoolGPA} onChange={(e) => setSchoolGPA(e.target.value)} />
                  </Grid>
                </>
              )}

              {studyType === "College" && (
                <>
                  <Grid item xs={6}>
                    <TextField label="College Name" fullWidth value={collegeName} onChange={(e) => setCollegeName(e.target.value)} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Course" fullWidth value={collegeCourse} onChange={(e) => setCollegeCourse(e.target.value)} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Year" fullWidth value={collegeYear} onChange={(e) => setCollegeYear(e.target.value)} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="College GPA" fullWidth value={collegeGPA} onChange={(e) => setCollegeGPA(e.target.value)} />
                  </Grid>
                </>
              )}

              {studyType === "University" && (
                <>
                  <Grid item xs={6}>
                    <TextField label="University Name" fullWidth value={universityName} onChange={(e) => setUniversityName(e.target.value)} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Course Pursuing" fullWidth value={coursePursuing} onChange={(e) => setCoursePursuing(e.target.value)} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Year" fullWidth value={universityYear} onChange={(e) => setUniversityYear(e.target.value)} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="University GPA" fullWidth value={universityGPA} onChange={(e) => setUniversityGPA(e.target.value)} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Special Merits" fullWidth value={specialMerits} onChange={(e) => setSpecialMerits(e.target.value)} />
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        )}

        {/* Step 3: Financial Information */}
        {currentStep === 3 && (
          <Paper sx={{ padding: 3, marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>
              Financial Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField label="Bank Name" fullWidth value={bankName} onChange={(e) => setBankName(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Annual Family Income" fullWidth value={annualFamilyIncome} onChange={(e) => setAnnualFamilyIncome(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Bank Account Number" fullWidth value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Bank IFSC Code" fullWidth value={bankIFSCCode} onChange={(e) => setBankIFSCCode(e.target.value)} />
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Step 4: Document Uploads */}
        {currentStep === 4 && (
          <Paper sx={{ padding: 3, marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>
              Document Uploads
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <input type="file" label = "Proof of Citizenship" onChange={(e) => handleFileChange(e, setProofOfCitizenship)} />
              </Grid>
              <Grid item xs={6}>
                <input type="file" label = "Proof of Studys"onChange={(e) => handleFileChange(e, setProofOfStudying)} />
              </Grid>
              <Grid item xs={6}>
                <input type="file" label = "Proof of Merits"onChange={(e) => handleFileChange(e, setProofOfFinancial)} />
              </Grid>
              <Grid item xs={6}>
                <input type="file" label = "Proof of Financial"onChange={(e) => handleFileChange(e, setProofOfMerits)} />
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Step 5: Scholarship Information */}
        {currentStep === 5 && (
          <Paper sx={{ padding: 3, marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>
              Scholarship Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Scholarship Name" fullWidth value={scholarshipName} onChange={(e) => setScholarshipName(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Purpose of Applying" fullWidth value={purposeOfApplying} onChange={(e) => setPurposeOfApplying(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Skills/Achievements" fullWidth value={skillsOrAchievements} onChange={(e) => setSkillsOrAchievements(e.target.value)} />
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Error and Success Messages */}
        {error && <Typography color="error">{error}</Typography>}
        {successMessage && <Typography color="success">{successMessage}</Typography>}

        {/* Step Navigation */}
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          {currentStep > 1 && (
            <Button variant="outlined" onClick={handleBack}>Back</Button>
          )}
          {currentStep < 5 && (
            <Button variant="contained" onClick={handleNext}>Next</Button>
          )}
          {currentStep === 5 && (
            <Button variant="contained" type="submit">Submit</Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default ScholarshipApplicationForm;
