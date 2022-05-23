import React, { useEffect, useState } from 'react';
import PhotolistEntry from './PhotolistEntry';
import { Box } from '@mui/material';
import axios from 'axios'
import { useLocation } from 'react-router-dom';

const getAllPhotos = () => {
  return axios.get('/getAllPhotos')
    .then(data => {
      return data.data
    })
}
const Photolists = ({ username, profile }) => {
  let [allPosts, setAllPost] = useState([])
  const location = useLocation()

  useEffect(() => {
    getAllPhotos()
      .then(data => setAllPost(data))
  }, [location.key])

  allPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {
        allPosts.map(item => {
          return <PhotolistEntry username={username} profile={profile} key={item._id} image={item} />
        })
      }
    </Box >
  )
}

export default Photolists;

