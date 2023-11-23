import { Form, Formik } from "formik";
import { Textarea } from "@mui/joy";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import useBlogCall from "../hooks/useBlogCall";
import { useSelector } from "react-redux";
import { useEffect } from "react";


// eslint-disable-next-line react/prop-types
const BlogForm = ({formValues , handleClose}) => {
    
    const {getCategories, createBlog, updateBlog} = useBlogCall()

    const {categories} = useSelector(state => state.blog)
   
   useEffect(() => {
     getCategories('categories')
   }, [])
// eslint-disable-next-line react/prop-types
const category_id = formValues?.category?._id
  return (
    <Formik
            initialValues={{
              ...formValues,
              category: category_id,
            }}
            onSubmit={(values, action) => {

                if("_id" in formValues){
                  updateBlog(values, values._id)
                  handleClose()
                }else{
                  createBlog(values)
                }
              action.resetForm()
              action.setSubmitting(false)
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
                            categories.map(category =><MenuItem  key={category._id} value={category._id}>{category.name}</MenuItem> )
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
  )
}

export default BlogForm