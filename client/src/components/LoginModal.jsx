import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import useAuthCall from '../hooks/useAuthCall';
import { useDispatch, useSelector } from 'react-redux';
import { modal } from '../features/authSlice';
import ReactCardFlip from 'react-card-flip';
import '../styles/GlobalStyle.css'
import { object, string } from "yup"
import CloseIcon from '@mui/icons-material/Close';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    overflowY: 'hidden',
    borderRadius: 10,
    transition: 'all 1 ease', // Geçiş efekti ekle
};
const secondCardStyle = {
    position: 'relative',
    height: '100%', // Kartın yüksekliğini modalin yüksekliğine eşitle
};

export const registerSchema = object({
    username: string()
        .max(20, "Kullanici adi 10 karakterden az olmalidir.")
        .required("username zorunludur"),
    email: string().email().required("Email zorunludur"),
    bio: string()
        .max(250, "Bio 250 karakterden az olmalidir.")
        .required("bio zorunludur"),
    password: string()
        .required("password zorunludur")
        .min(8, "password en az 8 karakter olmalidir")
        .max(20, "password en fazla 20 karakter olmalidir")
        .matches(/\d+/, "Password bir sayi içermelidir")
        .matches(/[a-z]/, "Password bir küçük harf içermelidir")
        .matches(/[A-Z]/, "Password bir büyük harf içermelidir")
        .matches(/[!,?{}><%&$#£+-.]+/, "Password bir özel karakter içermelidir"),
});

// eslint-disable-next-line react/prop-types
export default function LoginModal() {

    const { login, register } = useAuthCall()
    const dispacth = useDispatch();

    const { loading, modalOpen } = useSelector(state => state.auth)

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalOpen}
                onClose={() => dispacth(modal(false))}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modalOpen}>
                    <Box sx={{ ...style, p: { xs: 2, md: 10 }, width: { xs: '80%', md: 600 } }}  >

                        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" flipSpeedBackToFront={2}
                            flipSpeedFrontToBack={2}>

                            <Box sx={{ position: 'relative' }} >
                                <CloseIcon sx={{ position: 'absolute', top: { xs: 0, md: -65 }, right: { xs: 0, md: -60 }, cursor: 'pointer' }} onClick={() => dispacth(modal(false))} />

                                <Typography variant="h5" color="initial" textAlign={'center'} mb={3}>Join Us</Typography>
                                <Typography variant="h5" color="initial" textAlign={'center'} mb={3}>ali@drl26.com</Typography>

                                <Formik
                                    initialValues={{ email: "", password: "" }}
                                    onSubmit={(values, action) => {
                                        login(values)
                                        action.resetForm()
                                        action.setSubmitting(false)
                                    }}
                                >
                                    {
                                        ({ handleChange, values }) => (
                                            <Form>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

                                                    <TextField
                                                        id="standard-basic"
                                                        label="Email"
                                                        variant="standard"
                                                        onChange={handleChange}
                                                        value={values.email}
                                                        name='email'
                                                        type='email'

                                                    />

                                                    <FormControl variant="standard">
                                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                                        <Input
                                                            id="standard-adornment-password"
                                                            type={showPassword ? 'text' : 'password'}
                                                            onChange={handleChange}
                                                            value={values.password}
                                                            name='password'
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={handleClickShowPassword}
                                                                        onMouseDown={handleMouseDownPassword}
                                                                    >
                                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                        />
                                                    </FormControl>

                                                    <Button variant='contained' sx={{
                                                        backgroundColor: 'black', borderRadius: 5, px: 4, py: 2, '&:hover': {
                                                            backgroundColor: '#272727',
                                                        },
                                                    }} color="primary" type="submit">
                                                        {
                                                            loading ? 'Loading...' : 'SIGN IN '
                                                        }
                                                    </Button>

                                                    <Typography variant="caption" color="black">Don`t have an account?
                                                        <span style={{ color: 'red', cursor: 'pointer', marginLeft: '2px' }} onClick={() => setIsFlipped(!isFlipped)}>Sign Up</span>
                                                    </Typography>

                                                </Box>
                                            </Form>
                                        )
                                    }
                                </Formik>
                            </Box>

                            <Box sx={{ position: 'relative', ...secondCardStyle }}>
                                <CloseIcon sx={{ position: 'absolute', top: { xs: 0, md: -65 }, right: { xs: 0, md: -60 }, cursor: 'pointer' }} onClick={() => dispacth(modal(false))} />
                                <Typography variant="h5" color="initial" textAlign={'center'} mb={3}>Register</Typography>

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
                                                            variant="standard"
                                                            name="first_name"
                                                            onChange={handleChange}
                                                            value={values.first_name}
                                                            type="text"
                                                            sx={{ flexGrow: 1 }}
                                                        />
                                                        <TextField
                                                            id="last_name"
                                                            label="Last Name "
                                                            variant="standard"
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
                                                        variant="standard"
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
                                                        variant="standard"
                                                        name="bio"
                                                        onChange={handleChange}
                                                        value={values.bio}
                                                        type="text"
                                                        onBlur={handleBlur}
                                                        error={touched.bio && Boolean(errors.bio)}
                                                        helperText={touched.bio && errors.bio}
                                                    />
                                                    <TextField
                                                        id="image"
                                                        label="Image"
                                                        variant="standard"
                                                        name="image"
                                                        onChange={handleChange}
                                                        value={values.image}
                                                        type="url"
                                                    />
                                                    <TextField
                                                        id="email"
                                                        label="Email Address"
                                                        variant="standard"
                                                        name="email"
                                                        onChange={handleChange}
                                                        value={values.email}
                                                        type="email"
                                                        onBlur={handleBlur}
                                                        error={touched.email && Boolean(errors.email)}
                                                        helperText={touched.email && errors.email}

                                                    />
                                                    <FormControl variant="standard">
                                                        <InputLabel htmlFor="password">Password</InputLabel>
                                                        <Input
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

                                                    <Button variant='contained' sx={{ backgroundColor: 'black', borderRadius: 5, px: 4, py: 2 }} color="secondary" type="submit">
                                                        {
                                                            loading ? 'Loading...' : 'SIGN IN '
                                                        }
                                                    </Button>

                                                    <Typography variant="caption" color="black">Already have an account?
                                                        <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => setIsFlipped(!isFlipped)}> Sign In</span>
                                                    </Typography>
                                                </Box>
                                            </Form>
                                        )
                                    }
                                </Formik>
                            </Box>
                        </ReactCardFlip>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
