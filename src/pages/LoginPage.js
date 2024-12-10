import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

const LoginPage = ({ open, setOpen }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      fetchCaptcha();
    }
  }, [open]);

  const fetchCaptcha = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://scholarshipmanagementbackend-production.up.railway.app/api/captcha');
      const { num1, num2, answer } = response.data;
      setCaptchaQuestion(`${num1} + ${num2}`);
      setCaptchaAnswer(answer);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching CAPTCHA:', error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captcha || parseInt(captcha) !== captchaAnswer) {
      setErrorMessage('Invalid CAPTCHA. Please try again.');
      return;
    }

    try {
      const loginData = {
        username: username,
        password: password,
      };

      const response = await axios.post('https://scholarshipmanagementbackend-production.up.railway.appapi/users/login', loginData);

      if (response.status === 200) {
        localStorage.setItem('username', username);
        localStorage.setItem('role', response.data.role);

        if (response.data.role === 'ADMIN') {
          navigate('/admin-dashboard');
        } else if (response.data.role === 'USER') {
          navigate('/user-dashboard');
        }
        setIsLoginSuccess(true);
        setOpen(false);
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials and CAPTCHA.');
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const googleData = { token: response.credential };

      const googleResponse = await axios.post(
        'http://localhost:8080/api/users/google-login',
        googleData
      );

      if (googleResponse.status === 200) {
        const { username, role } = googleResponse.data;

        localStorage.setItem('username', username);
        localStorage.setItem('role', role);

        if (role === 'ADMIN') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
        setIsLoginSuccess(true);
        setOpen(false);
      }
    } catch (error) {
      setErrorMessage('Google Login failed. Please try again.');
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Typography variant="h5" align="center">Login</Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {isLoading ? (
              <CircularProgress />
            ) : (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="h6">{captchaQuestion}</Typography>
              </Box>
            )}

            <TextField
              label="Enter CAPTCHA"
              variant="outlined"
              fullWidth
              margin="normal"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
            />

            {errorMessage && (
              <Box sx={{ mt: 2 }}>
                <Typography color="error" variant="body2">{errorMessage}</Typography>
              </Box>
            )}

            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </DialogActions>
          </form>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="textSecondary">
              OR
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => setErrorMessage('Google Login failed. Please try again.')}
            />
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Not registered?{' '}
              <Button color="primary" onClick={() => navigate('/signup')}>
                Sign up
              </Button>
            </Typography>
          </Box>
        </DialogContent>

        <Snackbar
          open={isLoginSuccess}
          autoHideDuration={4000}
          onClose={() => setIsLoginSuccess(false)}
        >
          <Alert onClose={() => setIsLoginSuccess(false)} severity="success" sx={{ width: '100%' }}>
            Login Successful!
          </Alert>
        </Snackbar>
      </Dialog>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
