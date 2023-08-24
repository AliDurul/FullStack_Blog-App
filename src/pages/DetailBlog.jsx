/* eslint-disable react/prop-types */
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import { Badge, Box, Button, Chip, Stack } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';
import useBlog from '../hooks/useBlog';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentBox from '../components/CommentBox';
import { useState } from 'react';
import BlogUpdate from '../components/BlogUpdate';



export default function DetailBlog() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { blogDetail, } = useSelector(state => state.blog)
    const { userInfo } = useSelector(state => state.auth)
    const { getBlogById, createLike, getCategories } = useBlog()
    const [isCliked, setIsCliked] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [isUpdate, setIsUpdate] = useState(null)



    useEffect(() => {
        getBlogById('blogDetail', id)
        getCategories('categories')
    }, [])


    let isliked = blogDetail?.likes_n?.some(like => like?.user_id === userInfo?.id)
    let isAuthor = blogDetail?.author === userInfo?.username
    return (
        <>
            <Box sx={{ display: 'flex', p: 10, pb: 0, flexDirection: { xs: 'column', md: "row" } }} >
                <CardContent sx={{ display: 'flex', flexGrow: 1, justifyContent: "space-between", flexDirection: "column" }} >
                    <Box>
                        <CardHeader
                            sx={{ mb: 5, p: 0 }}
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    A
                                </Avatar>
                            }
                            title={<span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{blogDetail?.author}</span>}
                            subheader={blogDetail?.publish_date}
                        />

                        <Box sx={{ p: 2, mb: 4 }}>
                            <Typography variant="h4" color="initial">{blogDetail?.title}</Typography>
                            <Typography variant="body1" color="text.secondary" mb={3}>{blogDetail?.content}</Typography>


                            <Chip variant="outlined" color="primary" size="small" label={"# " + blogDetail?.category_name} />

                        </Box>
                    </Box>


                    <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
                        <Box>
                            <IconButton aria-label="add to favorites" onClick={() => createLike('blogs', id)}>
                                <Badge badgeContent={blogDetail?.likes} color="info">
                                    <FavoriteIcon sx={{ color: isliked ? "red" : "gray" }} />
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
                    {
                        blogDetail?.comments?.map(comment =>
                            <Box key={comment.id} sx={{ width: "300px", borderBottom: "1px solid black", p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Typography variant="body1" color="initial">{comment.user}</Typography>
                                <Typography variant="body2" color="initial">{comment.time_stamp}</Typography>
                                <Typography variant="body1" color="initial">{comment.content}</Typography>
                            </Box>)
                    }
                    <CommentBox id={blogDetail.id} />
                </Box>
            }

            <BlogUpdate open={open} setOpen={setOpen} blogDetail={blogDetail} isUpdate={isUpdate} />
        </>

    );
}








