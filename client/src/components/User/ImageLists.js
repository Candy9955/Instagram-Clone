import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const getUserPhotos = (username) => {
  return axios.post('/getUserPhotos', { username })
    .then(data => {
      return data.data
    })
}

export default function StandardImageList({ username, handleUserPostLength }) {
  const [photoData, setPhotoData] = useState([])
  const location = useLocation()

  useEffect(() => {
    getUserPhotos(username)
      .then(data => {
        handleUserPostLength(data.length)
        setPhotoData(data)
      })
  }, [username, location.key])

  photoData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return (
    <ImageList cols={3}>
      {photoData.map((item) => (
        <ImageListItem key={item._id}>
          <img
            src={item.photo}
            alt={item._id}
            style={{ aspectRatio: '1/1' }}
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

