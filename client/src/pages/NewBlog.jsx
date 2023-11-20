/* eslint-disable react/no-unescaped-entities */

import { Container, Grid } from "@mui/material"
import BlogForm from "../components/BlogForm"


const NewBlog = () => {

  return (
    <Container >
      <Grid container justifyContent={'center'} height={"80vh"} alignItems={'center'} >
        <Grid item xs={12} sm={10} md={6} lg={6} boxShadow={10} p={5}>
          <BlogForm formValues={{
            title: "",
            content: "",
            image: "",
            category: "",
            status: ""
          }} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default NewBlog