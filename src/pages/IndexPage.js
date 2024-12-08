import React, { useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box, Grid, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage';

const IndexPage = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openLogin, setOpenLogin] = React.useState(false);
    
    const carouselRef = useRef(null);  // Reference to the carousel container

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenLogin = () => {
        setOpenLogin(true);
    };

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    // Automatically scroll the carousel every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                const firstImage = carouselRef.current.children[0];
                const width = firstImage.offsetWidth;
                carouselRef.current.scrollBy({
                    left: width,  // Scroll by one image width
                    behavior: 'smooth',
                });

                // If we reach the end, scroll back to the start
                if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.offsetWidth) {
                    carouselRef.current.scrollLeft = 0;
                }
            }
        }, 5000); // Every 5 seconds

        return () => clearInterval(interval);  // Clear the interval when the component unmounts
    }, []);

    return (
        <div>
            {/* Navbar */}
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Home
                    </Typography>
                    <Button color="inherit" component={Link} to="/about">About Us</Button>
                    <Button color="inherit" component={Link} to="/how-to-apply">How to Apply</Button>
                    <Button
                        color="inherit"
                        onClick={handleMenuClick}
                    >
                        Account
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem component={Link} to="/login">Sign In</MenuItem>
                        <MenuItem component={Link} to="/signup">Sign Up</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{
                background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', minHeight: '100vh', paddingTop: '64px', 
                position: 'relative', overflow: 'hidden', paddingBottom: '60px'
            }}>
                <Container maxWidth="md">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" gutterBottom>
                                Welcome to My Scholarship Project!
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Apply for scholarships, track your application status, and much more. We're here to help you with your scholarship journey.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleOpenLogin}
                                    sx={{ margin: 1, width: '200px' }}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    component={Link}
                                    to="/signup"
                                    sx={{ margin: 1, width: '200px' }}
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Auto Scrolling Image Carousel */}
                    <Box sx={{
                        position: 'absolute', top: '60%', left: 0, right: 0, padding: '20px 0', 
                        background: 'rgba(255, 255, 255, 0.5)', borderRadius: '10px',
                        overflow: 'hidden', zIndex: 1
                    }}>
                        <Box
                            ref={carouselRef} 
                            sx={{
                                display: 'flex', overflowX: 'hidden', gap: '10px', 
                                justifyContent: 'center', alignItems: 'center', transition: 'scroll 0.5s ease'
                            }}
                        >
                            <Box sx={{
                                width: '300px', height: '200px', backgroundImage: 'url(https://www.ebcf.org/wp-content/uploads/2021/11/Scholarships_Header.jpg)', 
                                backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px',
                            }} />
                            <Box sx={{
                                width: '300px', height: '200px', backgroundImage: 'url(https://i.ytimg.com/vi/W1gZ7VOqXrg/maxresdefault.jpg)', 
                                backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px',
                            }} />
                            <Box sx={{
                                width: '300px', height: '200px', backgroundImage: 'url(https://th.bing.com/th/id/R.b6a4422b14284ea87ffa48fb9a9e46d8?rik=JEhO9GsLtlTiCw&riu=http%3a%2f%2feaworld.com%2fwp-content%2fuploads%2f2019%2f04%2fscholarship-banner.jpg&ehk=EM89cLxbRbYQoxavlxTEMHJxGPa0Qs68QQmsfgPYRPQ%3d&risl=&pid=ImgRaw&r=0)', 
                                backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px',
                            }} />
                            <Box sx={{
                                width: '300px', height: '200px', backgroundImage: 'url(https://th.bing.com/th/id/OIP.ujOK9VafA7nnROE-qFGldAHaEj?rs=1&pid=ImgDetMain)', 
                                backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px',
                            }} />
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Team Section at the Bottom */}
            <Box sx={{
                background: 'linear-gradient(135deg, #c3cfe2, #f5f7fa)', padding: '50px 0', textAlign: 'center'
            }}>
                <Typography variant="h4" gutterBottom>
                    Meet Our Team
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {/* Team Member 1 */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="body1">M. Hemanth Reddy - Project Manager</Typography>
                        <Typography variant="body2">Email: <a href="mailto:primefriends119@gmail.com">primefriends119@gmail.com</a></Typography>
                    </Grid>

                    {/* Team Member 2 */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="body1">R. Tarun - UI/UX Designer</Typography>
                        <Typography variant="body2">Email: <a href="mailto:rampuditarun@gmail.com">rampuditarun@gmail.com</a></Typography>
                    </Grid>

                    {/* Team Member 3 */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="body1">Siva Prasad T - Developer</Typography>
                        <Typography variant="body2">Email: <a href="mailto:tarigopulasiva4@gmail.com">tarigopulasiva4@gmail.com</a></Typography>
                    </Grid>
                </Grid>
                <Box sx={{
                background: '#333', color: '#fff', padding: '20px 0', textAlign: 'center', 
                fontSize: '14px',
            }}>
                <Typography variant="body2">
                    © {new Date().getFullYear()} My Scholarship Project. All Rights Reserved.
                </Typography>
            </Box>
            </Box>

            {/* Login Dialog */}
            {openLogin && <LoginPage open={openLogin} handleClose={handleCloseLogin} />}
        </div>
    );
};

export default IndexPage;
