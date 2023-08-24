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
import { Badge, Box, Button } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';
import useBlog from '../hooks/useBlog';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentBox from '../components/CommentBox';
import { useState } from 'react';



export default function DetailBlog() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { blogDetail } = useSelector(state => state.blog)
    const {userInfo} = useSelector(state=>state.auth)
    const { getBlogById, createLike } = useBlog()
    const [isCliked, setIsCliked] = useState(false)

    useEffect(() => {
        getBlogById('blogDetail', id)
    }, [])

    const { title, content, image, publish_date, author, likes, likes_n, post_views, comment_count,comments } = blogDetail

    let isliked = likes_n.some(like=> like.user_id === userInfo?.id )

    return (
        <>
            <Box sx={{ display: 'flex', p: 10, pb: 0 }} >
                <CardContent sx={{ display: 'flex', justifyContent: "space-between", flexDirection: "column" }} >

                    <Box>
                        <CardHeader
                            sx={{ mb: 5, p: 0 }}
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    A
                                </Avatar>
                            }
                            title={<span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{author}</span>}
                            subheader={publish_date}
                        />

                        <Box sx={{ p: 2, mb: 4 }}>
                            <Typography variant="h4" color="initial">{title}</Typography>
                            <Typography variant="body1" color="text.secondary">{content}</Typography>
                        </Box>
                    </Box>


                    <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
                        <Box>
                            <IconButton aria-label="add to favorites" onClick={() => createLike('blogs', id)}>
                                <Badge badgeContent={likes} color="info">
                                    <FavoriteIcon sx={{ color: isliked ? "red" : "gray" }} />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="view">
                                <Badge badgeContent={post_views} color="info" >
                                    <VisibilityOutlinedIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="view" onClick={() => setIsCliked(!isCliked)}>
                                <Badge badgeContent={comment_count} color="info">
                                    <RateReviewOutlinedIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </Box>

                        <Box>
                            <Button
                                onClick={() => navigate(-1)}
                                variant="text"
                                color="primary"
                            > Explore More</Button>
                        </Box>
                    </CardActions>
                </CardContent>
                <CardMedia
                    component="img"
                    height="500"
                    image={image}
                    alt={title}
                    sx={{ objectFit: "contain", width: "auto" }}
                />



            </Box>

            {isCliked &&
                <Box sx={{ display: 'flex', flexDirection: 'column', width: "50%", mb: 5, gap: 4, p: 10, pt: 5 }}>
                    {
                        comments.map(comment => 
                        <Box key={comment.id} sx={{ width: "300px", borderBottom: "1px solid black", p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Typography variant="body1" color="initial">{comment.user}</Typography>
                            <Typography variant="body2" color="initial">{comment.time_stamp}</Typography>
                            <Typography variant="body1" color="initial">{comment.content}</Typography>
                        </Box>)
                    }
                    <CommentBox id={blogDetail.id} />

                </Box>}
        </>

    );
}








