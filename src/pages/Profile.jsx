import { Avatar, Box, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import PersonIcon from '@mui/icons-material/Person';


const Profile = () => {

  const { userInfo } = useSelector(state => state.auth)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: "90vh", width: "100%" }}>
      <Card sx={{ width: 500, height: 500, border: "none", display: 'flex', flexDirection: 'column', justifyContent: "space-between" }}>
        {
          userInfo.image ?
            <CardMedia
              component="img"
              alt="user image"
              height="250"
              image={userInfo.image}
              sx={{ objectFit: 'contain' }}
            />
            :
            <Avatar alt="User" sx={{ width: 250, height: 250,mx:'auto' }}  >
              <PersonIcon  sx={{fontSize:"10rem"}}/>
            </Avatar>


        }
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" textAlign={'center'} mb={1} sx={{ fontWeight: 'bold' }}>
            {userInfo.first_name} {userInfo.last_name}
          </Typography>
          <Typography variant="h6" textAlign={'center'} color="text.secondary" sx={{ fontWeight: 'bold' }}>
            {userInfo.email}
          </Typography>
          <Typography variant="h6" textAlign={'center'} color="text.secondary" sx={{ fontWeight: 'bold' }}>
            {userInfo.bio}
          </Typography>
        </CardContent>

      </Card>
    </Box>
  )
}

export default Profile