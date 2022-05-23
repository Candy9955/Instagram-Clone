import React, { useEffect, useState } from 'react';
import {
  Paper,
  Avatar,
  Typography,
  Box,
  IconButton,
  Stack,
  TextField,
  Button

} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import axios from 'axios';
import NewComment from '../NewComment/NewComment'
import { useNavigate, useLocation } from 'react-router-dom';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

const getProfile = (username) => {
  return axios.post('/findUsers', { username })
    .then(data => {
      return data.data
    })
}

const onCommentSubmit = (e, newComment, photo, username, setTotalComments, totalComments, navigate, location) => {
  e.preventDefault()
  setTotalComments(totalComments + 1)
  axios.post('/newComment', { newComment, photo, username })
    .then(() => {
      navigate(location.pathname)
    })
}


const PhotolistEntry = ({ image, username }) => {
  const [post, setPost] = useState([])
  const [newComment, setNewComment] = useState([])
  const [likes, setLikes] = useState(image.likes)
  const [totalComments, setTotalComments] = useState(image.comments.length)


  const navigate = useNavigate()
  const location = useLocation()

  const heartOnClick = (photo) => {
    setLikes(likes + 1)
    axios.post('/likes', { photo })
  }

  useEffect(() => {
    getProfile(image.username)
      .then(data => setPost(data[0]))
  }, [image])


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ m: 1 }} src={post.profile} />
        <Typography sx={{ fontWeight: 'bold' }}>{image.username}</Typography>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <img
          src={image.photo}
          alt={image._id}
          style={{ objectFit: 'contain', width: '100%' }}
          loading='lazy'
        />
      </Box>

      <Box sx={{ ml: 0.5, display: 'flex' }}>
        <Box sx={{ flex: 1 }}>
          <IconButton onClick={() => heartOnClick(image.photo)}>
            <FavoriteBorderOutlinedIcon sx={{ mr: 1 }} />
          </IconButton>

          <IconButton>
            <ChatBubbleOutlineOutlinedIcon onClick={handleOpen} sx={{ mr: 1 }} />
            <NewComment comments={image.comments} photo={image.photo} username={image.username} profile={post.profile} open={open} handleClose={handleClose} />
          </IconButton>

          <IconButton>
            <SendOutlinedIcon />
          </IconButton>
        </Box>

        <IconButton sx={{ mr: 2 }}>
          <BookmarkBorderOutlinedIcon />
        </IconButton>

      </Box>
      <Stack sx={{ ml: 1.5, mb: 2 }}>
        <Typography sx={{ fontWeight: 'bold' }}>{likes} likes</Typography>
        <Typography color='gray'><strong>{image.username}:</strong> {image.captions}</Typography>

        <Box>
          <Typography onClick={handleOpen} color='gray' >View all {totalComments} comments</Typography>
          <NewComment comments={image.comments} photo={image.photo} username={image.username} profile={post.profile} open={open} handleClose={handleClose} />
        </Box>

      </Stack>
      <Box component="form" onSubmit={(e) => { onCommentSubmit(e, newComment, image.photo, username, setTotalComments, totalComments, navigate, location) }} >
        <TextField
          size='small'
          fullWidth
          onChange={(e) => { setNewComment(e.target.value) }}
          InputProps={{
            endAdornment:
              <Button type="submit" color="buttonColor" size='small' variant="text">POST</Button>
          }} />
      </Box>
    </Paper>
  )
}





export default PhotolistEntry;