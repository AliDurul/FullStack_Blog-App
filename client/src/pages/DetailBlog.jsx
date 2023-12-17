/* eslint-disable react/prop-types */
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import { Badge, Box, Button, CardMedia, Chip, Container } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import BlogModal from '../components/BlogModal';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useBlogCall from '../hooks/useBlogCall';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BlogComment from '../components/BlogComment';


export default function DetailBlog() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const { blogDetail } = useSelector(state => state.blog)
    const { getBlogById, createLike } = useBlogCall()


    const [isUpdate, setIsUpdate] = useState(null)
    const [open, setOpen] = useState(false);

    // modal toggle
    const handleOpen = () => setOpen(true);

    const CommentArr = blogDetail?.comments ? [...blogDetail.comments].reverse() : []

    useEffect(() => {
        getBlogById('blogDetail', id)
    }, [])

    // isAuther
    const isAuthor = blogDetail?.author === userInfo?.username
    // check isLiked
    let isLiked = blogDetail?.likes_n?.some(like => like.user_id === userInfo?._id)

    // drawer
    const [state, setState] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    return (
        <Container maxWidth='md' sx={{ color: '#6B6B6B', mb: 3 }}>

            <Box mt={5}>
                <Typography sx={{fontSize:{xs:'1.3rem' , md:'1.6rem', lg:'2.3rem'}}} fontWeight={700} color="initial">{blogDetail?.title}</Typography>
            </Box>

            <CardHeader
                sx={{ mb: 5, mt: 3, p: 0 }}
                avatar={
                    <Avatar aria-label="recipe" src={blogDetail?.author_info?.image} />
                }
                title={<span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{blogDetail?.author_info?.username}</span>}
                subheader={new Date(blogDetail?.createdAt).toLocaleString('us-US')}
            />

            <Box borderRadius={20} borderBottom={'1px solid #0909091e'} borderTop={'1px solid #0909091e'} mx={'auto'} display={'flex'} justifyContent={'space-around'} mb={5} p={2}>
                <IconButton aria-label="like it" onClick={() => createLike(id)} >
                    <Badge badgeContent={blogDetail?.likes} color="secondary">
                        <FavoriteIcon sx={{ color: isLiked ? "#c81212c6" : "gray" }} />
                    </Badge>
                </IconButton>
                <IconButton aria-label="views">
                    <Badge badgeContent={blogDetail?.post_views} color="secondary" >
                        <VisibilityOutlinedIcon />
                    </Badge>
                </IconButton>
                <IconButton aria-label="comment" onClick={toggleDrawer(true)}>
                    <Badge badgeContent={blogDetail?.comment_count} color="secondary">
                        <RateReviewOutlinedIcon />
                    </Badge>
                </IconButton>
                <IconButton aria-label="save it" >
                    <BookmarkBorderIcon />
                </IconButton>
                {
                    isAuthor && <Box display={'flex'}  sx={{gap:{xs:1, md:2, lg:4}}}>
                        <IconButton aria-label="edit" onClick={() => { handleOpen(), setIsUpdate(true) }} >
                            <EditNoteIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => { handleOpen(), setIsUpdate(false) }} >
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Box>
                }


            </Box>


            <CardMedia
                component="img"
                image={blogDetail?.image}
                alt={blogDetail?.title}
                sx={{ objectFit: "contain", width: '100%', mb: 4 }}
            />

            <Chip size="small" sx={{ backgroundColor: '#F2F2F2', mt: { xs: 3, md: 0 } }} label={"# " + blogDetail?.category?.name} />

            <Typography mb={2} variant="body1" color="textSecondary" lineHeight={2} textAlign={'justify'} >{blogDetail?.content}</Typography>


            <Button
                onClick={() => navigate("/")}
                variant="outlined"
                color="primary"
                sx={{ borderRadius: 5 }}
            > Explore More</Button>


            <BlogComment state={state} toggleDrawer={toggleDrawer} id={blogDetail._id} CommentArr={CommentArr}/>

                    {/* <BlogComment id={blogDetail._id} /> */}

            <BlogModal open={open} setOpen={setOpen} blogDetail={blogDetail} isUpdate={isUpdate} />
        </Container>

    );
}








