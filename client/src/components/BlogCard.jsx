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
import { Badge, Box, Chip, Stack } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';
import useBlogCall from '../hooks/useBlogCall';
import { useSelector } from 'react-redux';



export default function BlogCard({ blog }) {

    const navigate = useNavigate()
    const { createLike } = useBlogCall()

    const { _id, title, content, image, createdAt, author, likes, post_views, comment_count, category_name, likes_n } = blog

    // check isLiked
    const { userInfo } = useSelector(state => state.auth)
    let isLiked = likes_n.some(like => like.user_id === userInfo?._id)
    
    console.log(isLiked);
    const date = new Date(createdAt).toDateString()



    return (
        <Box sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', display: 'flex', justifyContent: 'space-between', p: 2 }}>
            <Box sx={{ flex: '3 0 0' }} >
                <CardHeader 
                    avatar={
                        <Avatar onClick={() => navigate(`detail/${_id}`)} sx={{ bgcolor: red[500], cursor:'pointer' }} aria-label="recipe">
                            A
                        </Avatar>
                    }
                    title={<span onClick={() => navigate(`detail/${_id}`)} style={{ fontWeight: 'bold', textTransform: 'uppercase' , cursor:'pointer'}}>{author}</span>}
                    subheader={date}
                />
                <CardContent sx={{ paddingTop: 0, cursor:'pointer' }} onClick={() => navigate(`detail/${_id}`)}>
                    <Typography variant="h5" color="initial" >{title.slice(0, 50)}</Typography>

                    <Typography variant="body2"  color="text.secondary" mb={1} sx={{
                        overflow: 'hidden',
                        whiteSpace: 'wrap',
                        display:{xs:'none', md:'flex'}
                    }}>{content.slice(0, 150)}...</Typography>

                    <Chip size="small" sx={{ backgroundColor: '#F2F2F2', mt:{xs:3 , md:0} }} label={"# " + category_name} />

                </CardContent>

                <CardActions disableSpacing sx={{ justifyContent: "space-between", flexDirection: { xs: 'column', md: 'row' } }}>
                    <Box>
                        <IconButton aria-label="add to favorites" onClick={() => createLike(_id)} >
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
                </CardActions>

            </Box>

            <Stack justifyContent={'center'} alignItems={'center'} margin={'auto'} sx={{ flex: '1 0 0', cursor: 'pointer' }} onClick={() => navigate(`detail/${_id}`)} >
                <img style={{ objectFit: "contain", height: '80%', width: '80%' }} src={image} alt={title} />
            </Stack>

        </Box>
    );
}
