import { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from "@mui/joy/Link";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
// import Logo from "../../assets/LandingPage/Logo.jpg"

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: 'transparent',
        position: 'relative'
      }}
      className="shadow-xl"
    >
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Typography level="h3">MealConnect</Typography>
      </Box>

      {/* Desktop Navigation */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '1rem', alignItems: 'center' }}>
        {/* Common Links for All Users */}
        <Button variant="plain"><Link underline='none' href="/">Home</Link></Button>
        <Button variant="plain"><Link underline='none' href="/about">About</Link></Button>

        {isAuthenticated && (
          <>
            <Button variant="plain"><Link underline='none' href="/contact">Contact</Link></Button>
            <Button variant="plain"><Link underline='none' href="/donate">Donate</Link></Button>
            <Button variant="plain"><Link underline='none' href="/dashboard">Dashboard</Link></Button>
            {user?.role === 'ngo' && (
              <Button variant="plain">
                <Link underline='none' href="/ngo/dashboard">NGO Dashboard</Link>
              </Button>
            )}
          </>
        )}
      </Box>

      {/* Desktop Auth Buttons */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '1rem' }}>
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.name}</span>
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="plain">
              <Link underline='none' href="/login">Login</Link>
            </Button>
            <Button variant="plain">
              <Link underline='none' href="/signup">Register</Link>
            </Button>
          </>
        )}
      </Box>

      {/* Mobile Menu Button */}
      <Box sx={{ display: { md: 'none' } }}>
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerToggle}
        anchor="left"
        sx={{ display: { md: 'none' } }}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            <ListItem>
              <Button variant="plain" onClick={handleDrawerToggle}>
                <Link underline='none' href="/">Home</Link>
              </Button>
            </ListItem>
            <ListItem>
              <Button variant="plain" onClick={handleDrawerToggle}>
                <Link underline='none' href="/about">About</Link>
              </Button>
            </ListItem>

            {isAuthenticated && (
              <>
                <ListItem>
                  <Button variant="plain" onClick={handleDrawerToggle}>
                    <Link underline='none' href="/contact">Contact</Link>
                  </Button>
                </ListItem>
                <ListItem>
                  <Button variant="plain" onClick={handleDrawerToggle}>
                    <Link underline='none' href="/donate">Donate</Link>
                  </Button>
                </ListItem>
                <ListItem>
                  <Button variant="plain" onClick={handleDrawerToggle}>
                    <Link underline='none' href="/dashboard">Dashboard</Link>
                  </Button>
                </ListItem>
                {user?.role === 'ngo' && (
                  <ListItem>
                    <Button variant="plain" onClick={handleDrawerToggle}>
                      <Link underline='none' href="/ngo/dashboard">NGO Dashboard</Link>
                    </Button>
                  </ListItem>
                )}
              </>
            )}

            <ListItem>
              {isAuthenticated ? (
                <Button variant="outlined" onClick={() => { handleLogout(); handleDrawerToggle(); }}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant="outlined" onClick={handleDrawerToggle}>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button variant="outlined" onClick={handleDrawerToggle}>
                    <Link underline='none' href="/signup">Register</Link>
                  </Button>
                </>
              )}
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Navbar;