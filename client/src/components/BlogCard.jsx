/* eslint-disable react/prop-types */

import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import { Badge, Box, Chip, Stack } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';
import useBlogCall from '../hooks/useBlogCall';
import { useSelector } from 'react-redux';



export default function BlogCard({ blog }) {

    const navigate = useNavigate()
    const { createLike } = useBlogCall()

    const { _id, title, content, image, createdAt, author_info, likes, post_views, comment_count, category, likes_n } = blog

    // check isLiked
    const { userInfo } = useSelector(state => state.auth)
    let isLiked = likes_n.some(like => like.user_id === userInfo?._id)

    const date = new Date(createdAt).toDateString()


    return (
        <Box sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.075)', display: 'flex', justifyContent: 'space-between', pt: 3, p:2 }}>
            <Box sx={{ flex: '2 0 0' }} >
                <CardHeader
                    avatar={
                        <Avatar onClick={() => navigate(`detail/${_id}`)} sx={{ cursor: 'pointer' }} aria-label="recipe" src={author_info?.image} />
                    }
                    title={<span onClick={() => navigate(`detail/${_id}`)} style={{ fontWeight: 'bold', textTransform: 'capitalize', cursor: 'pointer' }}>{author_info?.first_name} {author_info?.last_name}</span>}
                    subheader={date}
                />
                <CardContent sx={{ paddingTop: 0, cursor: 'pointer' }} >
                    <Typography variant="h5" sx={{fontSize:{xs:'1rem', md:'2rem'}}} color="initial" onClick={() => navigate(`detail/${_id}`)}>{title.slice(0, 50)}</Typography>

                    <Typography onClick={() => navigate(`detail/${_id}`)} variant="body2" color="text.secondary" mb={1} sx={{
                        overflow: 'hidden',
                        whiteSpace: 'wrap',
                        display: { xs: 'none', md: 'flex' }
                    }}>{content.slice(0, 150)}...</Typography>

                    <Box display={'flex'} alignItems={'center'}>
                        <Chip size="small" sx={{ backgroundColor: '#F2F2F2', mt: { xs: 3, md: 0 } }} label={"# " + category?.name} />
                        <CardActions disableSpacing sx={{ justifyContent: "space-between", flexDirection: { xs: 'column', md: 'row' } , display:{xs:'none', md:'flex'}}}>
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
                            </Box>
                        </CardActions>
                    </Box>

                </CardContent>



            </Box>

            <Stack height={'100%'} justifyContent={'center'} alignItems={'center'} margin={'auto'} sx={{ flex: '1 0 0', cursor: 'pointer' }} onClick={() => navigate(`detail/${_id}`)} >
                <img style={{ objectFit: "cover",  width: '100%' }} src={image} alt={title} />
            </Stack>

        </Box>
    );
}
