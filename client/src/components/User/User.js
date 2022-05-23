import React from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Input, Button } from '@mui/material';
import UserImages from "./UserImages";
import axios from 'axios';

const uploadOnChange = (file, username, handleProfile) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('username', username);
  formData.append('createdAt', new Date());
  axios({
    method: 'post',
    url: '/uploadProfile',
    data: formData
  })
    .then(({ data }) => handleProfile(data))
};

const User = ({ username, fullName, handleProfile,
  profile, followers, following,
  handleUserPostLength, userPostLength }) => {
  return (
    <Box sx={{ px: '10%' }}>
      <Box sx={{ display: 'flex', mt: 2.5, pl: 12, pt: 4, pb: 4 }}>
        <Avatar sx={{ width: 120, height: 120, mx: 10 }} src={profile} />
        <Box sx={{ pb: 3, ml: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography sx={{ mr: 3, fontSize: 25 }}>{username}</Typography>
            <label htmlFor="contained-button-file">
              <Input
                sx={{ display: 'none' }}
                accept="image/*"
                id="contained-button-file"
                multiple type="file"
                onChange={(e) => uploadOnChange(e.target.files[0], username, handleProfile)} />
              <Button size='small' variant="contained" component="span">
                Edit Profile
              </Button>
            </label>
          </Box>
          <Box sx={{ display: 'flex', flex: 1, mb: 2 }}>
            <Typography sx={{ mr: 4 }}><strong>{userPostLength}</strong> posts</Typography>
            <Typography sx={{ mr: 4 }}><strong>{followers.length}</strong> followers</Typography>
            <Typography><strong>{following.length}</strong> following</Typography>
          </Box>
          <Typography sx={{ fontWeight: 'bold' }}>{fullName}</Typography>
        </Box>
      </Box>
      <UserImages username={username} handleUserPostLength={handleUserPostLength} />
    </Box>
  )
}

export default User