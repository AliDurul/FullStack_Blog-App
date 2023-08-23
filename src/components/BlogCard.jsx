/* eslint-disable react/prop-types */

import Card from '@mui/material/Card';
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
import { useSelector } from 'react-redux';



export default function BlogCard({ blog }) {
    const navigate = useNavigate()
    const { createLike } = useBlog()
    const {userInfo} = useSelector(state=>state.auth)




    const { id, title, content, image, publish_date, author, likes, likes_n, post_views, comment_count } = blog


  
    
    let isliked = likes_n.some(like=> like.user_id === userInfo?.id )
    



    return (
        <Card sx={{ maxWidth: 400, height:500, boxShadow: 10 ,display:'flex',flexDirection:'column' , justifyContent:'space-between' , p:2} }>
            <CardHeader 
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        A
                    </Avatar>
                }
                title={<span style={{ fontWeight: 'bold', textTransform:'uppercase'}}>{author}</span>}
                subheader={publish_date}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={title}
                sx={{ objectFit: "contain" }}
            />
            <Typography variant="h5" color="initial" textAlign={'center'}>{title}</Typography>
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>{content}</Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
                <Box>
                    <IconButton aria-label="add to favorites" onClick={()=>{createLike('blogs',id)}}>
                        <Badge badgeContent={likes} color="info">
                            <FavoriteIcon sx={{color: isliked? "red" : "gray"}}/>
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
                        onClick={()=> navigate(`detail/${id}`)}
                        variant="text"
                        color="primary"
                    > Read More</Button>
                </Box>
            </CardActions>

        </Card>
    );
}
