import React, { useState } from 'react';
import {
  Box,
  TextField,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ handleLoginUser }) => {
  const [email, setEmail] = useState(null);
  const [passWord, setPassWord] = useState(null);

  const navigate = useNavigate()

  const loginSubmit = (e) => {
    e.preventDefault();
    let obj = { email, passWord }
    axios.post('/login', obj)
      .then(({ data }) => {
        if (data[0] === 'success') {
          const { userName, fullName, profile, followers, following } = data[1]
          handleLoginUser(userName, fullName, profile, followers, following)
          navigate('/home')
        } else {
          alert('no such user or password not correct')
        }
      })
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ width: '30%', pt: 5, pb: 7, mt: 15 }} elevation={3}>
        <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25, mb: 3 }}>Instagram</Typography>
        <Box sx={{ mx: 5 }} >
          <Box component="form" onSubmit={e => loginSubmit(e)}>
            <TextField
              onChange={e => setEmail(e.target.value)}
              required
              fullWidth
              size='small'
              label="email"
              id="email"
              sx={{ mb: 2 }} />
            <TextField
              onChange={e => setPassWord(e.target.value)}
              required
              type='password'
              fullWidth size='small'
              label="password"
              id="password"
              sx={{ mb: 2 }} />
            <Button type="submit" color='buttonColor' sx={{ width: '100%', mb: 3 }} variant="contained">Login</Button>
          </Box>
          <hr />
          <Box sx={{ align: 'center', display: 'flex', pt: 2, alignItems: 'center' }}>
            <Typography color='gray'>Don't have an account?</Typography>
            <Link to='/signup'>
              <Button color="buttonColor" size='small' variant="text">Sign up</Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default Login