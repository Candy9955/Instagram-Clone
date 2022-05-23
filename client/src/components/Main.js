import React from 'react'
import Box from '@mui/material/Box'
import {
  Outlet
} from "react-router-dom"
import Appbar from './Appbar/Appbar'

const Main = ({ profile, username }) => {
  return (
    <Box sx={{ bgcolor: '#fafafa' }}>
      <Appbar profile={profile} username={username} />
      <Outlet />
    </Box>
  )
}

export default Main
