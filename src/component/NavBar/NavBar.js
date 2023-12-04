import React, { useEffect, useState} from "react";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { NavLink, useLocation } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import "./NavBar.scss";
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography, Avatar } from "@mui/material";
import Login from "../Login/Login";
import { Link } from 'react-router-dom';
import { UserAuth } from '../../auth/AuthContext';


export default function NavBar() {
  const { theme, toggle, dark } = useContext(ThemeContext);
  const location = useLocation(); // Get the current URL location

  const isHomePage = location.pathname === '/home';

  const {user, logOut} = UserAuth();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
const handleSignOut = async ()=>{
  try {
    await logOut()
  } catch (error) {
    console.log(error);
  }
}

const handleOpenNavMenu = (event) => {
 setAnchorElNav(event.currentTarget);
};
const handleCloseNavMenu = () => {
 setAnchorElNav(null);
};
const handleOpenUserMenu = (event) => {
 setAnchorElUser(event.currentTarget);
};
const handleCloseUserMenu = () => {
 setAnchorElUser(null);
};



  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          document.querySelector(".navbar").classList.add("navbar-scroll");
        } else {
          document.querySelector(".navbar").classList.remove("navbar-scroll");
        }
      }
      window.addEventListener("scroll", handleScroll)
  
      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isHomePage]);

  return (
    <AppBar position="static" className={`navbar ${isHomePage ? '' : 'navbar-scroll'}`}>
      <Toolbar>
        <ul className="navbar-list">
          <li>
            <NavLink to="/home" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/news" activeClassName="active">
              News
            </NavLink>
          </li>
          <li>
            <NavLink to="/feedback" activeClassName="active">
              Feedback
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
          </li>
        </ul>
        <div
          className="icon-mode"
          style={{
            marginLeft: "auto",
            marginRight: "10px",
          }}
          onClick={toggle}
        >
          {!dark ? <Brightness5Icon /> : <Brightness2Icon />}
        </div>

        <Box sx={{ flexGrow: 0 }}>
              {user?.displayName?(
                <div>
                <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.email} src={user.photoURL} sx={{ width: 32, height: 32 }}/>

              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '50px' }}
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
               <MenuItem  onClick={handleCloseUserMenu}>
                <Typography textAlign="center" ><Link to='/dashboard' style={{textDecoration:"none"}}>Dashboard</Link></Typography>
                </MenuItem>
                <MenuItem>
                <Typography textAlign="center" onClick={handleSignOut}>Logout</Typography>
                </MenuItem>
            </Menu>
                </div>
              ):(
                <Login />
               )}
          </Box>

      </Toolbar>
    </AppBar>
  );
}