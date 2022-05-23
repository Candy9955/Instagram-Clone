import React from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Photolists from './Photolists'
import { Link } from 'react-router-dom'
import Suggestion from "./Suggestion";



const Home = ({ username, fullName, profile }) => {
  return (
    <Box sx={{ display: 'flex', pt: 5, px: '15%', justifyContent: 'flex-end' }}>

      <Box sx={{ flex: 6 }}>
        <Photolists username={username} profile={profile} />
      </Box>

      <Box sx={{ pb: 2, flex: 4, px: '3%' }}>
        <Box sx={{ display: 'flex' }}>
          <Link to='/user'>
            <Avatar sx={{ width: 50, height: 50 }} src={profile} />
          </Link>
          <Box>
            <Typography sx={{ mb: 0.5, fontWeight: 'bold', fontSize: 18 }}>{username}</Typography>
            <Typography sx={{ fontSize: 14 }}>{fullName}</Typography>
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 'bold', mt: 2, mb: 2 }} color='gray'>Suggestions For You</Typography>
        <Suggestion username={username} />
      </Box>

    </Box >
  )
}

export default Home