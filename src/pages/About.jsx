import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Link, Stack } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';

const icons = [
  {
    icon: <InstagramIcon />,
    url: "https://www.instagram.com/",
    color: "blue"
  },
  {
    icon: <GitHubIcon />,
    url: "https://github.com/AliDurul",
    color: "gray"
  },
  {
    icon: <LinkedInIcon />,
    url: "https://www.linkedin.com/in/ali-durul/",
    color: "blue"
  },
  {
    icon: <MailIcon />,
    url: "mailto:alidrl26@gmail.com",
    color: "red"
  }
]



export default function About() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: "90vh", width: "100%" }}>
      <Card sx={{ width: 500, height: 500, boxShadow: 10 ,display: 'flex',flexDirection:'column', justifyContent: "space-between"}}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="../../public/Lee.jpg"
          sx={{ objectFit: 'fill' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h1" component="div" textAlign={'center'} mb={1} sx={{ fontWeight: 'bold' }}>
            AYA
          </Typography>
          <Typography variant="h4" textAlign={'center'} color="text.secondary" sx={{ fontWeight: 'bold' }}>
            Code Friends
          </Typography>
        </CardContent>
        <CardActions>

          <Stack direction="row" spacing={2} mx={"auto"} mb={2}>
            {
              icons.map((icon, i) => (
                <Link key={i} href={icon.url} sx={{ '& .MuiSvgIcon-root': { color: 'black', fontSize: '3rem' }, "&:hover .MuiSvgIcon-root": { color: `${icon.color}` } }}>
                  {icon.icon}
                </Link>
              ))
            }
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
}
