import { AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';

import DashboardIcon from '@mui/icons-material/Dashboard';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
          <Typography variant="h6" color="primary" fontWeight="bold">
            HouseHunt
          </Typography>
        </Link>

        <div style={{ flexGrow: 1 }} />

        {isAuthenticated ? (
          <div>
            <Button color="inherit" onClick={handleMenu}>
              <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
              {user?.name}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => { logout(); handleClose(); }}>
                Logout
              </MenuItem>
              <MenuItem onClick={() => { navigate('/dashboard'); handleClose(); }}>
                <DashboardIcon sx={{ mr: 1 }} /> Dashboard
</MenuItem>
            </Menu>
          </div>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="primary" variant="contained" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;