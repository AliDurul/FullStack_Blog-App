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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBlog from '../hooks/useBlog';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';



export default function DetailBlog() {
    const { id } = useParams()
    const { blogDetail } = useSelector(state => state.blog)

    const { getBlogById } = useBlog()

    useEffect(() => {
        getBlogById('blogDetail',id)
    }, [])

    const navigate = useNavigate()
    const [isLiked, setIsLiked] = useState(false)

    const { title, content, image, publish_date, author, likes, post_views, comment_count } = blogDetail


    return (
            <Box sx={{ display: 'flex', p:10 }} >
                <CardMedia
                    component="img"
                    height="500"
                    image={image}
                    alt={title}
                    sx={{ objectFit: "contain", width: "auto" }}
                />


                <CardContent sx={{display:'flex', justifyContent:"space-between", flexDirection:"column"}} >

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

                    <Box sx={{ p: 2,mb:4 }}>
                        <Typography variant="h4" color="initial">{title}</Typography>
                        <Typography variant="body1" color="text.secondary">{content}</Typography>
                    </Box>
                  </Box>


                    <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
                        <Box>
                            <IconButton aria-label="add to favorites" onClick={() => setIsLiked(!isLiked)}>
                                <Badge badgeContent={likes} color="info">
                                    <FavoriteIcon sx={{ color: isLiked ? "red" : "gray" }} />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="view">
                                <Badge badgeContent={post_views} color="info" >
                                    <VisibilityOutlinedIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="view">
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



            </Box>



    );
}








