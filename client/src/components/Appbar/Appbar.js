import * as React from 'react';
import { Input } from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom'
import PostModal from './PostModal';

const Appbar = ({ profile, username }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AppBar position="static" sx={{ px: '12%' }}>
      <Toolbar disableGutters>
        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontFamily: 'Oleo Script Swash Caps', fontSize: 30 }}
          >
            Instagram
          </Typography>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link to='/home'>
              <IconButton><HomeRoundedIcon fontSize='medium' sx={{ color: 'black' }} /></IconButton>
            </Link>
            <IconButton><SendOutlinedIcon fontSize='medium' sx={{ color: 'black' }} /></IconButton>
            <Box >
              <IconButton onClick={handleOpen} color="primary" aria-label="upload picture" component="span">
                <AddCircleOutlineOutlinedIcon fontSize='medium' sx={{ color: 'black' }} />
              </IconButton>
              <PostModal open={open} handleClose={handleClose} profile={profile} username={username} />
            </Box>
            <IconButton><FavoriteBorderOutlinedIcon fontSize='medium' sx={{ color: 'black' }} /></IconButton>
          </Box>

          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} >
                <Avatar sx={{ width: 24, height: 24 }} src={profile} />
              </IconButton>
            </Tooltip>
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
              <MenuItem onClick={handleCloseUserMenu}>
                <AccountCircleOutlinedIcon sx={{ marginRight: '10px' }} />
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <BookmarkAddedOutlinedIcon sx={{ marginRight: '10px' }} />
                <Typography textAlign="center">Saved</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};


export default Appbar