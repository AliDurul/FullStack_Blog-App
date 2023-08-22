/* eslint-disable react/no-unescaped-entities */
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { Avatar, Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material"
import { useState } from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { blue } from "@mui/material/colors";
import { Form, Formik } from "formik";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";


const Login = () => {
    const { login } = useAuth()


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container >
            <Grid container justifyContent={'center'} height={"80vh"} alignItems={'center'} >
                <Grid item xs={12} sm={10} md={6} lg={4}  >
                    <Avatar
                        sx={{
                            backgroundColor: blue[300],
                            m: "auto",
                            mb: 3,
                            width: 40,
                            height: 40,
                        }}
                    >
                        <LockOpenIcon size="30" />
                    </Avatar>
                    <Typography variant="h5" color="initial" textAlign={'center'} mb={3}>Login</Typography>
                    <Typography variant="h5" color="initial" textAlign={'center'} mb={3}>ali@drl26.com</Typography>

                    <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={(values) => {
                            login(values)
                        }}
                    >
                        {
                            ({ handleChange, values }) => (
                                <Form>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <TextField
                                            id="email"
                                            label="Email Address"
                                            variant="outlined"
                                            name="email"
                                            onChange={handleChange}
                                            value={values.email}
                                            type="email"
                                        />
                                        <FormControl variant="outlined">
                                            <InputLabel htmlFor="password">Password</InputLabel>
                                            <OutlinedInput
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                                name="password"
                                                onChange={handleChange}
                                                value={values.password}
                                            />
                                        </FormControl>
                                        <Button variant='contained' color="primary" type="submit">
                                            SIGN IN
                                        </Button>
                                        <Typography variant="caption" color="initial">Don't have an account? <Link
                                            to={'/register'}
                                            style={{ textDecoration: 'none', color: "red" }}
                                        >Sign Up</Link></Typography>
                                    </Box>
                                </Form>
                            )
                        }
                    </Formik>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login