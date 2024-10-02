import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Grid,
    Box,
    Typography,
    Paper,
    Checkbox,
    FormControlLabel,
    TextField,
    CssBaseline,
    IconButton,
    InputAdornment,
    CircularProgress,
    Backdrop
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../assets/designlogin.jpg";
import { LightPurpleButton } from '../components/buttonStyles';
import Popup from '../components/Popup';
import { loginUser } from '../redux/userRelated/userHandle';

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        rollNumber: false,
        studentName: false
    });

    const handleInputChange = (event) => {
        const { name } = event.target;
        setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const fields = {};

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                setErrors({
                    rollNumber: !rollNum,
                    studentName: !studentName,
                    password: !password
                });
                return;
            }
            fields.rollNum = rollNum;
            fields.studentName = studentName;
            fields.password = password;
        } else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                setErrors({
                    email: !email,
                    password: !password
                });
                return;
            }
            fields.email = email;
            fields.password = password;
        }

        setLoader(true);
        dispatch(loginUser(fields, role));
    };

    const guestModeHandler = () => {
        const password = "zxc";
        const fields = role === "Student" ? {
            rollNum: "1",
            studentName: "Dipesh Awasthi",
            password
        } : {
            email: role === "Admin" ? "yogendra@12" : "tony@12",
            password
        };

        setGuestLoader(true);
        dispatch(loginUser(fields, role));
    };

    useEffect(() => {
        if (status === 'success' || currentUser) {
            navigate(currentRole === 'Admin' ? '/Admin/dashboard' : currentRole === 'Student' ? '/Student/dashboard' : '/Teacher/dashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
    }, [status, currentRole, navigate, response, currentUser]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                            {role} Login
                        </Typography>
                        <Typography variant="h7">Welcome back! Please enter your details</Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            {role === "Student" ? (
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="rollNumber"
                                        label="Enter your Roll Number"
                                        type="number"
                                        error={errors.rollNumber}
                                        helperText={errors.rollNumber && 'Roll Number is required'}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="studentName"
                                        label="Enter your name"
                                        error={errors.studentName}
                                        helperText={errors.studentName && 'Name is required'}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="email"
                                    label="Enter your email"
                                    error={errors.email}
                                    helperText={errors.email && 'Email is required'}
                                    onChange={handleInputChange}
                                />
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={togglePasswordVisibility ? 'text' : 'password'}
                                error={errors.password}
                                helperText={errors.password && 'Password is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setTogglePasswordVisibility(!togglePasswordVisibility)}>
                                                {togglePasswordVisibility ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Link to="#" style={{ color: "#7f56da", textDecoration: 'none' }}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <LightPurpleButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3 }}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
                            </LightPurpleButton>
                            <Button
                                fullWidth
                                onClick={guestModeHandler}
                                variant="outlined"
                                sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
                            >
                                Login as Guest
                            </Button>
                            {role === "Admin" && (
                                <Grid container>
                                    <Grid item>
                                        Don't have an account?
                                    </Grid>
                                    <Grid item sx={{ ml: 2 }}>
                                        <Link to="/Adminregister" style={{ color: "#7f56da", textDecoration: 'none' }}>
                                            Sign up
                                        </Link>
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={guestLoader}
            >
                <CircularProgress color="primary" />
                Please Wait
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
};

export default LoginPage;
