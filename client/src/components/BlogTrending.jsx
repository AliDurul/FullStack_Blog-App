import { Avatar, Box,  Container,  Grid, Paper, Stack, Typography, styled } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate } from 'react-router-dom';


const TrendBlog = styled(Paper)(({ theme }) => ({
    width: '100%',
    cursor:'pointer',
    padding: theme.spacing(1),
    ...theme.typography.body2,
    textAlign: 'left',
   
}));

// eslint-disable-next-line react/prop-types
const BlogTrending = ({ blogs }) => {

    const navigate = useNavigate()

    const trendBlogs = [...blogs].sort((a, b) => b.likes - a.likes).slice(0, 4)



    return (
        <Container maxWidth={'xl'} sx={{mt:5}}>
            <Box display={'flex'} alignItems={'center'} mb={2}>
                <Avatar sx={{ width: 25, height: 25, border: '1px solid black', bgcolor: 'transparent', mr: 1 }}>
                    <TrendingUpIcon fontSize='10px' color='primary' />
                </Avatar>
                <Typography variant="h6" color="primary" fontWeight={600}>Trending on Blogger</Typography>
            </Box>


            <Grid container spacing={2}>
                {trendBlogs.map((trendBlog, i) => {
                    let originalDate = new Date(trendBlog.createdAt);
                    let formatedDate = originalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                    return (
                        <Grid key={trendBlog._id} item xs={12} sm={6} md={3}>
                            <Stack direction="row" spacing={1} >
                                <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: '38px', textDecoration: 'none solid rgb(242,242,242)', color: '#f2f2f2' }}>0{i + 1}</Typography>

                                <TrendBlog  elevation={0}  square={false} onClick={() => navigate(`detail/${trendBlog._id}`)}>
                                    <Box display={'flex'} alignItems={'center'} mb={1}>
                                        <Avatar sx={{ width: 30, height: 30, mr: 1 }} src={trendBlog?.author_info?.image} />
                                        <Typography variant="body2" color="primary"> {trendBlog.author_info?.first_name} {trendBlog.author_info?.last_name}</Typography>
                                    </Box>

                                    <Typography variant='body2' color="primary" fontWeight={700}>{trendBlog.title}</Typography>
                                    <Typography variant="body2" color="primary">{formatedDate}</Typography>
                                </TrendBlog>
                            </Stack>
                        </Grid>
                    );
                })}
            </Grid>

        </Container>

    )
}

export default BlogTrending