/* eslint-disable react/prop-types */
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import BlogForm from './BlogForm';
import BlogDel from './BlogDel';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BlogModal({ open, setOpen, blogDetail, isUpdate }) {

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
                            isUpdate
                                ? <BlogForm formValues={blogDetail}  handleClose={handleClose}/>
                                : <BlogDel id={blogDetail._id}  handleClose={handleClose}/>
                                
                        }

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
