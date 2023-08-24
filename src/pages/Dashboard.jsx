import { Grid } from "@mui/material"
import BlogCard from "../components/BlogCard"
import { useEffect } from "react"
import useBlog from "../hooks/useBlog"
import { useSelector } from "react-redux"

const Dashboard = () => {

  const { getBlog } = useBlog()
  const { blogs } = useSelector(state => state.blog)


  useEffect(() => {
    getBlog('blogs')
  }, [])





  return (
    


      <Grid container spacing={5} mt={5} mb={10} justifyContent={'center'}>

        {
          blogs.map((blog) =>
            <Grid item key={blog.id}>
              <BlogCard blog={blog} />
            </Grid>)
        }

      </Grid>
  
  )
}

export default Dashboard