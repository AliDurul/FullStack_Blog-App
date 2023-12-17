import Avatar from "@mui/material/Avatar"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Formik, Form } from "formik"
import { useSelector } from "react-redux"
import { Divider } from "@mui/material"


const Profile = () => {

  const { userInfo } = useSelector(state => state.auth)



  return (
    <Container maxWidth='xl' sx={{ mt: 5 }}>
      <Grid container sx={{
        height: "100vh",
        p: 2,
      }}>

        <Grid item xs={12} md={2} pt={9}>
          <Avatar sx={{ width: 100, height: 100, mb:3 }} src={userInfo?.image} />
          <Typography variant="h5" color="initial">{userInfo?.username}</Typography>
        </Grid>

        <Divider orientation="vertical" />

        <Grid item xs={12} md={8} >
          <Formik
            initialValues={userInfo}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {
              ({ handleChange, values, handleBlur, touched, errors }) => (
                <Form>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pl:10, pt:9}}>

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
                      label="Tell us about yourself"
                      variant="outlined"
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


                    <Button variant='contained' sx={{ borderRadius: 5, px: 4, py: 2, alignSelf:'flex-start' }} color="primary" type="submit">
                      update profile
                    </Button>
                    
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

export default Profile