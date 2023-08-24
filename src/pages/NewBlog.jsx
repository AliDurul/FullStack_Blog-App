/* eslint-disable react/no-unescaped-entities */

import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"


import { Form, Formik } from "formik";
import { useEffect } from "react";
import useBlog from "../hooks/useBlog";
import { Textarea } from "@mui/joy";
import { useSelector } from "react-redux";


const NewBlog = () => {
  const { getCategories,createBlog } = useBlog()

  const { categories } = useSelector(state => state.blog)


  useEffect(() => {
    getCategories('categories')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <Container >
      <Grid container justifyContent={'center'} height={"80vh"} alignItems={'center'} >
        <Grid item xs={12} sm={10} md={6} lg={4} boxShadow={10} p={5}>


          <Formik
            initialValues={{
              title: "",
              content: "",
              image: "",
              category: "",
              status: ""
            }}
            onSubmit={(values) => {
              console.log(values);
              createBlog(values)
            }}
          >
            {
              ({ handleChange, values }) => (
                <Form>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Typography variant="h5" color="initial" textAlign={'center'} mb={2}>New Blog</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="category">Categories</InputLabel>
                        <Select
                          labelId="category"
                          id="category"
                          label="Categories"
                          value={values.category}
                          name="category"
                          onChange={handleChange}
                        >
                          {
                            categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)
                          }

                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel id="status">Status</InputLabel>
                        <Select
                          labelId="status"
                          label="Status"
                          id="status"
                          value={values.status}
                          name="status"
                          onChange={handleChange}
                        >
                          <MenuItem value={'d'}>Draft</MenuItem>
                          <MenuItem value={'p'}>Published</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <TextField
                      id="title"
                      label="Title "
                      variant="outlined"
                      name="title"
                      onChange={handleChange}
                      value={values.title}
                      type="text"
                      required
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
                    <Textarea
                      color="primary"
                      minRows={5}
                      maxRows={6}
                      placeholder="Content"
                      size="md"
                      variant="outlined"
                      name="content"
                      value={values.content}
                      onChange={handleChange}
                    />

                    <Button variant='contained' color="primary" type="submit">
                      SAVE
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

export default NewBlog