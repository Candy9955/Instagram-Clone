import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const getSuggestion = () => {
  return axios.get('/getAllUsers')
    .then(data => {
      return data.data
    })
}


const Suggestion = ({ username }) => {
  const [users, setUser] = useState([])
  let [onClicked, setOnClicked] = useState(false)

  const followOnClick = (username, follows) => {
    axios.post('/follow', { username, follows })
      .then(() => {
        setOnClicked(!onClicked)
      })
  }



  useEffect(() => {
    getSuggestion()
      .then(data => {
        let result = data.filter(x => x.userName !== username)
        setUser(result)
      })
  }, [onClicked])
  return (
    <Box>
      {
        users.map(item => {
          return (
            <Box key={item.userName} sx={{ display: 'flex', pb: 1.5 }}>
              <Box sx={{ display: 'flex', flex: 1 }}>
                <Avatar sx={{ width: 30, height: 30, mr: 1 }} src={item.profile} />
                <Typography sx={{ fontWeight: 'bold', fontSize: 15 }}>{item.userName}</Typography>
              </Box>
              {
                item.followers.includes(username) ?
                  <Button onClick={(e) => followOnClick(username, item.userName)} color="grayButtonColor" size='small' variant="text" >Following</Button>
                  : <Button onClick={(e) => followOnClick(username, item.userName)} color="buttonColor" size='small' variant="text" >Follow</Button>
              }

            </Box>
          )
        })
      }
    </Box>
  )
}

export default Suggestion;