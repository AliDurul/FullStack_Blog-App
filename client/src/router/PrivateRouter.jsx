import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { modal } from "../features/authSlice"
import { useNavigate } from "react-router-dom"


const PrivateRouter = () => {


  const { token} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()



  if (!token) {
    dispatch(modal(true))
    navigate('/')
    return null;
  }

  return <Outlet />


}

export default PrivateRouter