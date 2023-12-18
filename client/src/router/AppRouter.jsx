import { Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Dashboard from "../pages/Dashboard"
import PrivateRouter from "./PrivateRouter"
import NewBlog from "../pages/NewBlog"
import MyBlogs from "../pages/MyBlogs"
import Profile from "../pages/Profile"
import LoginModal from "../components/LoginModal"
import DetailBlog from "../pages/DetailBlog"
import { Box } from "@mui/material"





const AppRouter = () => {


  return (
    <Box sx={{fontFamily:'Segoe UI'}}>


      <Navbar />

      <Routes>

        <Route path='/' element={<Dashboard />} />

        <Route path="" element={<PrivateRouter />} >

          <Route path='newblog' element={<NewBlog />} />
          <Route path='myblogs' element={<MyBlogs />} />
          <Route path='profile' element={<Profile />} />
          <Route path="detail/:id" element={<DetailBlog />} />

        </Route>

      </Routes>

      <LoginModal open={open} />


    </Box>
  )
}

export default AppRouter