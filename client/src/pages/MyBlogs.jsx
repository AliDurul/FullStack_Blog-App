import { Avatar, Badge, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from "@mui/material"
import { red } from "@mui/material/colors"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useBlogCall from "../hooks/useBlogCall";



const MyBlogs = () => {
  const navigate = useNavigate()

  const { userBlogs } = useSelector(state => state.blog)
  const { userInfo } = useSelector(state => state.auth)
  const { getUserBlog } = useBlogCall()


  useEffect(() => {
    getUserBlog('userBlogs', userInfo.username)
  }, [])


  return (
    <>
      {
        userBlogs.length === 0
          ? <Box sx={{display:"flex", width:'100vw', justifyContent:'center', alignItems:'center', height:'80vh', flexDirection:'column', gap:5 }}>
            <Typography variant={"h3"} color="primary">No Any Blog</Typography>
            <Button variant="contained" onClick={()=>navigate("/newblog")}>Write A Blog</Button>
          </Box>
          :
          <Grid container spacing={5} mt={5} mb={10} justifyContent={'center'}>

            {
              userBlogs.map(blog => {
                const { title, content, image, createdAt, author, likes, post_views, comment_count, likes_n } = blog
                let isliked = likes_n.some(like => like.user_id === userInfo?._id)

                return (
                  <Grid item key={blog._id}>
                    <Card sx={{ maxWidth: 400, height: 500, boxShadow: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            A
                          </Avatar>
                        }
                        title={<span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{author}</span>}
                        subheader={createdAt}
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
                            onClick={() => navigate(`/detail/${blog._id}`)}
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
      }




    </>
  )
}

export default MyBlogs
