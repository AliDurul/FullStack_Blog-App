/* eslint-disable react/no-unescaped-entities */
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { Avatar, Box, Button, Container, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material"
import { useState } from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { blue } from "@mui/material/colors";
import { Form, Formik } from "formik";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { object, string } from "yup"


export const registerSchema = object({
    username: string()
        .required("username zorunludur"),
    //   .max(10, "Kullanici adi 10 karakterden az olmalidir.")
    // first_name: string()
    //   .max(20, "İsim 20 karakterden az olmalidir.")
    //   .required("first_name zorunludur"),
    // last_name: string()
    //   .max(20, "Soyisim 30 karakterden az olmalidir.")
    //   .required("last_name zorunludur"),
    email: string().email().required("Email Reqiured"),
    password: string()
        .required("password zorunludur")
        .min(8, "password en az 8 karakter olmalidir")
        .matches(/\d+/, "Password bir sayi içermelidir")
        .matches(/[a-z]/, "Password bir küçük harf içermelidir")
        .matches(/[A-Z]/, "Password bir büyük harf içermelidir")
        .matches(/[!,?{}><%&$#£+-.]+/, "Password bir özel karakter içermelidir"),
    //   .max(20, "password en fazla 20 karakter olmalidir")

})

const Register = () => {
    const { register } = useAuth()


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
                            mb: 2,
                            width: 40,
                            height: 40,
                        }}
                    >
                        <LockOpenIcon size="30" />
                    </Avatar>
                    <Typography variant="h5" color="initial" textAlign={'center'} mb={2}>Register</Typography>
                    <Formik
                        initialValues={{
                            username: "",
                            first_name: "",
                            last_name: "",
                            email: "",
                            image: "",
                            bio: "",
                            password: "",
                        }}
                        validationSchema={registerSchema}
                        onSubmit={(values) => {
                            register({ ...values, password2: values.password })
                        }}
                    >
                        {
                            ({ handleChange, values, handleBlur, touched, errors }) => (
                                <Form>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <TextField
                                                id="first_name"
                                                label="First Name "
                                                variant="outlined"
                                                name="first_name"
                                                onChange={handleChange}
                                                value={values.first_name}
                                                type="text"
                                                sx={{ flexGrow: 1 }}
                                            />
                                            <TextField
                                                id="last_name"
                                                label="Last Name "
                                                variant="outlined"
                                                name="last_name"
                                                onChange={handleChange}
                                                value={values.last_name}
                                                type="text"
                                                sx={{ flexGrow: 1 }}
                                            />
                                        </Box>
                                        <TextField
                                            id="username"
                                            label="User Name "
                                            variant="outlined"
                                            name="username"
                                            onChange={handleChange}
                                            value={values.username}
                                            type="text"
                                            onBlur={handleBlur}
                                            error={touched.username && Boolean(errors.username)}
                                            helperText={touched.username && errors.username}
                                        />
                                        <TextField
                                            id="bio"
                                            label="Tell us about yourself.."
                                            variant="outlined"
                                            name="bio"
                                            onChange={handleChange}
                                            value={values.bio}
                                            type="text"
                                        />
                                        <TextField
                                            id="image"
                                            label="Image"
                                            variant="outlined"
                                            name="image"
                                            onChange={handleChange}
                                            value={values.image}
                                            type="url"
                                        />
                                        <TextField
                                            id="email"
                                            label="Email Address"
                                            variant="outlined"
                                            name="email"
                                            onChange={handleChange}
                                            value={values.email}
                                            type="email"
                                            onBlur={handleBlur}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}

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
                                                required
                                                onBlur={handleBlur}
                                             

                                            />

                                            {touched.password && Boolean(errors.password) && (
                                                <FormHelperText error id="accountId-error">
                                                    {touched.password && errors.password}
                                                </FormHelperText>
                                            )}
                                        </FormControl>

                                        <Button variant='contained' color="primary" type="submit">
                                            SIGN IN
                                        </Button>
                                        <Typography variant="caption" color="initial">Already have an account? <Link
                                            to={'/login'}
                                            style={{ textDecoration: 'none', color: "red" }}
                                        >Sign In</Link></Typography>
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

export default Register