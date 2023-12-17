import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import BadgeAvatars from './BadgeAvatars';
import { CardMedia, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { modal } from '../features/authSlice';
import useAuthCall from '../hooks/useAuthCall';
import logo from '../img/logo.png'
import { useNavigate } from 'react-router-dom';


const pages = [
  { id: 1, title: 'DASHBORAD', url: '/' },
  { id: 2, title: 'NEW BLOG', url: '/newblog' },
];

const LogedOutSettings = [{ id: 1, title: 'Login', url: 'login' }];

const LogedInSettings = [
  { id: 1, title: "My Blogs", url: "myblogs" },
  { id: 2, title: "Profile", url: "profile" },
  { id: 3, title: "Logout", url: "/" }];

// eslint-disable-next-line no-unused-vars, react/prop-types
function Navbar() {

  const { token, userInfo } = useSelector(state => state.auth)
  const { logout } = useAuthCall()
  const dispacth = useDispatch();
  const navigate = useNavigate()


  let settings = token ? LogedInSettings : LogedOutSettings

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [navbarBg, setNavbarBg] = React.useState(false)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  window.addEventListener("scroll", () => {

    let height = (window.innerWidth > 900) ? 426 : 260

    window.scrollY > height ? setNavbarBg(true) : setNavbarBg(false);
  });


  return (
    <>
      <AppBar position="fixed" >
        <Container maxWidth="false" sx={{ borderBottom: '2px solid black', transition: 'all 0.3s ease-in-out', backgroundColor: navbarBg ? 'white' : '#FFC018' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters >

              <Box sx={{ display: { xs: 'none', md: 'flex' }, }} flexDirection={'column'} mr={2} mt={0}>
                <CardMedia
                  sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}
                  component="img"
                  height="90"
                  image={logo}
                  alt={'logo'}
                />

              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="black"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <NavLink style={({ isActive }) => ({ fontWeight: isActive ? 300 : 600, color: "black", textDecoration: 'none' })} to={page.url} > {page.title}</NavLink>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>


              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page.id}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <NavLink style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400, textDecoration: 'none', color: 'black' })} to={page.url} > {page.title}</NavLink>
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Stack spacing={1} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                  {token && <Typography variant="body1" color="initial">{userInfo?.username}</Typography>}
                  <Tooltip title="Open settings">

                    {
                      token ? (
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <BadgeAvatars image={userInfo?.image} />
                        </IconButton>)

                        : <Button onClick={() => dispacth(modal(true))} variant='contained' sx={{  opacity:0.9 , borderRadius: 5, "&:hover":{  opacity:1 }}}
                         >Get Started</Button>
                    }

                  </Tooltip>
                </Stack>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <NavLink onClick={() => setting.title === 'Logout' && logout()} style={({ isActive }) => ({ color: isActive ? "rgb(255, 47, 47)" : 'black', textDecoration: 'none' })} to={setting.url} > {setting.title}</NavLink>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </Container>

      </AppBar>
      <Box sx={{ height: { xs: '30px', md: '108px' } }} />
    </>
  );
}
export default Navbar;
