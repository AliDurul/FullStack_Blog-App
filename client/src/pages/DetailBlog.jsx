/* eslint-disable react/prop-types */
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import { Badge, Box, Button, CardMedia, Chip, Stack } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import BlogModal from '../components/BlogModal';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useBlogCall from '../hooks/useBlogCall';
import BlogComment from '../components/BlogComment';



export default function DetailBlog() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const { blogDetail } = useSelector(state => state.blog)
    const { getBlogById, createLike } = useBlogCall()


    const [isUpdate, setIsUpdate] = useState(null)
    const [isCliked, setIsCliked] = useState(false)
    const [open, setOpen] = useState(false);

    // modal toggle
    const handleOpen = () => setOpen(true);

    const orderedComment = blogDetail?.comments ?  [...blogDetail.comments] : []

    useEffect(() => {
        getBlogById('blogDetail', id)
    }, [])

    // isAuther
    const isAuthor = blogDetail?.author === userInfo?.username

    // check isLiked
    let isLiked = blogDetail?.likes_n?.some(like => like.user_id === userInfo?._id)

    return (
        <>
            <Box sx={{ display: 'flex', p: 10, pb: 0, flexDirection: { xs: 'column', md: "row" } }} >
                <CardContent sx={{ display: 'flex', flexGrow: 1, justifyContent: "space-between", flexDirection: "column" }} >
                    <Box>
                        <CardHeader
                            sx={{ mb: 5, p: 0 }}
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {blogDetail?.author ? blogDetail?.author.slice(0, 1).toUpperCase() : 'A'}

                                </Avatar>
                            }
                            title={<span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{blogDetail?.author}</span>}
                            subheader={new Date(blogDetail?.createdAt).toLocaleString('us-US')}
                        />

                        <Box sx={{ p: 2, mb: 4 }}>
                            <Typography variant="h4" color="initial">{blogDetail?.title}</Typography>
                            <Typography variant="body1" color="text.secondary" mb={3}>{blogDetail?.content}</Typography>


                            <Chip variant="outlined" color="primary" size="small" label={"# " + blogDetail?.category_name} />

                        </Box>
                    </Box>


                    <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
                        <Box>
                            <IconButton aria-label="add to favorites" onClick={() => createLike(id)} >
                                <Badge badgeContent={blogDetail?.likes} color="info">
                                    <FavoriteIcon sx={{ color: isLiked ? "red" : "gray" }} />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="view">
                                <Badge badgeContent={blogDetail?.post_views} color="info" >
                                    <VisibilityOutlinedIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="view" onClick={() => setIsCliked(!isCliked)}>
                                <Badge badgeContent={blogDetail?.comment_count} color="info">
                                    <RateReviewOutlinedIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', md: "row" } }}>



                            {
                                isAuthor &&
                                <Stack spacing={2} direction={{ md: 'column', lg: 'row' }} useFlexGap flexWrap="wrap">
                                    <Button variant="contained" color="success" onClick={() => { handleOpen(), setIsUpdate(true) }}>
                                        Update
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={() => { handleOpen(), setIsUpdate(false) }}>
                                        Delete
                                    </Button>
                                </Stack>
                            }


                            <Button
                                onClick={() => navigate("/")}
                                variant="contained"
                                color="primary"
                            > Explore More</Button>
                        </Box>
                    </CardActions>
                </CardContent>
                <CardMedia
                    component="img"
                    image={blogDetail?.image}
                    alt={blogDetail?.title}
                    sx={{ objectFit: "contain", width: '100%', maxWidth: '700px', height: "auto", flexGrow: 1 }}
                />

            </Box>


            {
                isCliked &&
                <Box sx={{ display: 'flex', flexDirection: 'column', width: "50%", mb: 5, gap: 4, p: 10, pt: 5 }}>

                    <BlogComment id={blogDetail._id} />

                    {
                        orderedComment.reverse().map(comment =>
                            <Box key={comment._id} sx={{ width: "300px", borderBottom: "1px solid black", p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Typography variant="body1" color="initial">{comment.user}</Typography>
                                <Typography variant="body2" color="initial">{new Date(comment.createdAt).toLocaleString('us-US')}</Typography>
                                <Typography variant="body1" color="initial">{comment.content}</Typography>
                            </Box>)
                    }
                </Box>
            }


            <BlogModal open={open} setOpen={setOpen} blogDetail={blogDetail} isUpdate={isUpdate} />
        </>

    );
}








