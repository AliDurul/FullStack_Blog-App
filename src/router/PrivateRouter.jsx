
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { Outlet } from "react-router-dom"

const PrivateRouter = () => {

  const {token} =  useSelector(state=>state.auth)

  
  return  token ? <Outlet/> : <Navigate to={'login'}/>
}

export default PrivateRouter