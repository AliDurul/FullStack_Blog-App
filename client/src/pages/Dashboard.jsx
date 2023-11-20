import { useEffect } from "react"
import useBlogCall from "../hooks/useBlogCall"
import { Container, Divider, Grid } from "@mui/material"
import Header from "../components/Header"
import { useSelector } from "react-redux"
import BlogCard from "../components/BlogCard"
import News from "../components/News"

const Dashboard = () => {


  const { getBlog } = useBlogCall()
  const { blogs } = useSelector(state => state.blog)

  useEffect(() => {
    getBlog('blogs')

  }, [])


  return (
    <>

      <Header />

      <Container maxWidth={'xl'}>


        <Grid container columnSpacing={5} mt={5}>
          <Grid item xs={12} md={7} lg={8} display={'flex'} flexDirection={'column'} gap={3} >
            {
              blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
            }
          </Grid>

            <hr style={{marginLeft: '40px', marginTop:'100px'}}/>
          {/* <Divider sx={{ height: '100vh',display:{xs:'none', md:'flex'}  ,border: '1px solid orrange', marginTop: 12, marginLeft:5 }} variant="middle" orientation="vertical" /> */}

          <Grid item sx={{display:{xs:'none', md:'flex'}}} md={4} lg={3} >

            <News />
          </Grid>
        </Grid>




      </Container>
    </>
  )
}

export default Dashboard