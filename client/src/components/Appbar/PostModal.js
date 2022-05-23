import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Input,
  IconButton,
  Paper,
  TextField,
  Button
} from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  height: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex'
};

const uploadPost = (file, username, setFormData) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('username', username);
  formData.append('createdAt', new Date());
  setFormData(formData);
};
const handlePostSubmit = (e, formData, captions, navigate, location) => {
  e.preventDefault()
  formData.append('captions', captions);
  axios({
    method: 'post',
    url: '/uploadPhoto',
    data: formData
  })
    .then((result) => {
      console.log('success')
      navigate(location.pathname)
    })
}

const PostModal = ({ open, handleClose, profile, username }) => {
  const [formData, setFormData] = useState(null)
  const [captions, setCaptions] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ p: 10 }}
    >
      <Box sx={style}>
        <Paper onSubmit={(e) => handlePostSubmit(e, formData, captions, navigate, location)} component="form" sx={{ width: '80%', pt: 3, pl: 2, pr: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ width: 40, height: 40, mr: 1 }} src={profile} />
            <Typography sx={{ fontWeight: 'bold' }}>{username}</Typography>
          </Box>
          <hr />
          <label htmlFor="icon-button-file" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
            <Input
              required
              accept="image/*"
              id="icon-button-file"
              type="file"
              sx={{ display: 'none' }}
              onChange={(e) => uploadPost(e.target.files[0], username, setFormData)}
            />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <AddCircleOutlineOutlinedIcon fontSize='large' sx={{ color: 'black' }} />
            </IconButton>
          </label>
          <Box sx={{ mt: 2 }}>
            <TextField
              required
              fullWidth
              label="Captions"
              id="fullWidth"
              onChange={e => setCaptions(e.target.value)}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" color="buttonColor" size='small' variant="text">Post</Button>
          </Box>
        </Paper>
      </Box>
    </Modal >
  )
}

export default PostModal