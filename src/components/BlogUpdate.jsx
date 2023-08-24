/* eslint-disable react/prop-types */
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { Textarea } from '@mui/joy';
import useBlog from '../hooks/useBlog';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BlogUpdate({ open, setOpen, blogDetail, isUpdate }) {

    const { categories } = useSelector(state => state.blog)
    const { updateBlog,deleteBlog } = useBlog()
    const handleClose = () => setOpen(false);
   

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {
                            isUpdate ?
                                <Formik
                                    initialValues={blogDetail}
                                    onSubmit={(values) => {
                                        updateBlog(values, values.id)
                                        handleClose()
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
                                                        UPDATE
                                                    </Button>
                                                </Box>
                                            </Form>
                                        )
                                    }
                                </Formik>
                                :
                                <Box>
                                    <Typography variant="h5" color="initial" sx={{mb:2}}>Do you really want to delete your blog? This process cannot be undone!</Typography>
                                    <Stack spacing={2} direction={{ md: 'column', lg: 'row' }} justifyContent={'center'}>
                                        <Button variant="contained" color="success" onClick={handleClose} >
                                            Cancel
                                        </Button>
                                        <Button variant="outlined" color="error" onClick={()=>deleteBlog(blogDetail.id)}>
                                            Delete
                                        </Button>
                                    </Stack>
                                </Box>

                        }
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
