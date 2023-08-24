import { Avatar, Badge, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from "@mui/material"
import { red } from "@mui/material/colors"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useBlog from "../hooks/useBlog";



const MyBlogs = () => {
  const navigate = useNavigate()
  const { userBlogs } = useSelector(state => state.blog)
  const { userInfo } = useSelector(state => state.auth)
  const {getUserBlog } = useBlog()


  useEffect(() => {
    getUserBlog('userBlogs',userInfo.id)
  }, [])


  return (
    <Grid container spacing={5} mt={5} mb={10} justifyContent={'center'}>
      {
        userBlogs.map(blog => {
          const { title, content, image, publish_date, author, likes, post_views, comment_count, likes_n} = blog
          let isliked = likes_n.some(like=> like.user_id === userInfo?.id )

          return (
            <Grid item key={blog.id}>
              <Card sx={{ maxWidth: 400, height: 500, boxShadow: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      A
                    </Avatar>
                  }
                  title={<span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{author}</span>}
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
                    <IconButton aria-label="add to favorites" >
                      <Badge badgeContent={likes} color="info">
                        <FavoriteIcon sx={{ color: isliked ? "red" : "gray" }} />
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
                      variant="text"
                      color="primary"
                    > Read More</Button>
                  </Box>
                </CardActions>

              </Card>
            </Grid>
          )
        }

        )
      }
    </Grid>
  )
}

export default MyBlogs
