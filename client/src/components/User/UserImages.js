import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import StandardImageList from './ImageLists'

const UserImages = ({ username, handleUserPostLength }) => {
  return (
    <Box sx={{ px: '5%' }}>
      <hr />
      <Box sx={{ display: 'flex', flex: 1, mb: 2, justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GridOnRoundedIcon fontSize='small' sx={{ pr: 1 }} />
          <Typography variant='overline' sx={{ mr: 4 }}>POSTS</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BookmarkBorderOutlinedIcon fontSize='small' sx={{ pr: 1 }} />
          <Typography variant='overline' sx={{ mr: 4 }}>SAVED</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AssignmentIndOutlinedIcon fontSize='small' sx={{ pr: 1 }} />
          <Typography variant='overline' sx={{ mr: 4 }}>TAGGED</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <StandardImageList username={username} handleUserPostLength={handleUserPostLength} />
      </Box>
    </Box>
  )
}

export default UserImages