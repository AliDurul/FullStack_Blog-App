import { Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Dashboard from "../pages/Dashboard"
import About from "../pages/About"
import PrivateRouter from "./PrivateRouter"
import NewBlog from "../pages/NewBlog"
import MyBlogs from "../pages/MyBlogs"
import Profile from "../pages/Profile"
import LoginModal from "../components/LoginModal"
import DetailBlog from "../pages/DetailBlog"





const AppRouter = () => {


  return (
    <div>


      <Navbar/>

      <Routes>

        <Route path='/' element={<Dashboard />} />
        <Route path='about' element={<About />} />

        <Route path="" element={<PrivateRouter />} >

          <Route path='newblog' element={<NewBlog />} />
          <Route path='myblogs' element={<MyBlogs />} />
          <Route path='profile' element={<Profile />} />
          <Route path="detail/:id" element={<DetailBlog />} />


        </Route>

      </Routes>

      <LoginModal open={open} />

      <Footer />

    </div>
  )
}

export default AppRouter