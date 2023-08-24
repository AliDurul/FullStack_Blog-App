import { Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Dashboard from "../pages/Dashboard"
import About from "../pages/About"
import NewBlog from "../pages/NewBlog"
import PrivateRouter from "./PrivateRouter"
import Login from "../pages/Login"
import MyBlogs from "../pages/MyBlogs"

import Profile from "../pages/Profile"
import Register from "../pages/Register"
import DetailBlog from "../pages/DetailBlog"


const AppRouter = () => {
    return (
        <div>
            <Navbar />

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="about" element={<About />} />

                <Route path="" element={<PrivateRouter />}>
                    <Route path="newblog" element={<NewBlog />} />
                    <Route path="myblogs" element={<MyBlogs />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="detail/:id" element={<DetailBlog />} />
                </Route>
                <Route path="register" element={<Register/>}/>

                <Route path="login" element={<Login />} />
        


            </Routes>

        </div>
    )
}

export default AppRouter