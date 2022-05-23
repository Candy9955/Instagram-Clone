import React from 'react';
import {
  Box,
  TextField,
  Paper,
  Typography,
  Button,
  Avatar,
  Modal

} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  display: 'flex',
  justifyContent: 'center',
  width: '70%',
};


const NewComment = ({ open, handleClose, username, profile, comments, photo }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ flex: 6 }}>
          <img
            src={photo}
            srcSet={photo}
            alt={'noImage'}
            style={{ objectFit: 'contain', width: '100%' }}
            loading='lazy'
          />
        </Box>
        <Box sx={{ flex: 4 }}>
          <Paper sx={{ display: 'flex', alignItems: 'center', px: 2, py: 2 }}>
            <Avatar sx={{ width: 35, height: 35, mr: 1 }} src={profile} />
            <Typography>{username}</Typography>
          </Paper>
          <Box sx={{ ml: 2, mt: 2 }}>
            {
              comments.map((x, i) => {
                return (
                  <Typography key={i}><strong>{x.username}</strong>: {x.newComment}</Typography>
                )
              })
            }
          </Box>
        </Box>
      </Box>
    </Modal>

  )
}

export default NewComment;
