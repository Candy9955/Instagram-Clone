import React, { useState } from 'react';
import {
  Box,
  TextField,
  Paper,
  Typography,
  Button
} from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [passWord, setPassWord] = useState(null);
  const signupSubmit = (e) => {
    e.preventDefault()
    let obj = {
      email,
      fullName,
      userName,
      passWord
    }
    axios.post('/signup', obj)
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ width: '30%', pt: 5, pb: 7, mt: 10 }} elevation={3}>
        <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25, mb: 3 }}>Instagram</Typography>
        <Box sx={{ mx: 5 }} component="form" onSubmit={e => signupSubmit(e)}>
          <TextField required fullWidth size='small' type="email" label="email" id="email" sx={{ mb: 2 }} onChange={e => setEmail(e.target.value)} />
          <TextField required fullWidth size='small' label="full name" id="fullName" sx={{ mb: 2 }} onChange={e => setFullName(e.target.value)} />
          <TextField required fullWidth size='small' label="user name" id="userName" sx={{ mb: 2 }} onChange={e => setUserName(e.target.value)} />
          <TextField required fullWidth size='small' type="password" label="password" id="password" sx={{ mb: 2 }} onChange={e => setPassWord(e.target.value)} />
          <Button type="submit" color='buttonColor' sx={{ width: '100%', mb: 3 }} variant="contained">Sign up</Button>
          <hr />
          <Box sx={{ align: 'center', display: 'flex', pt: 2, alignItems: 'center' }}>
            <Typography color='gray'>Have an account?</Typography>
            <Link to='/login'>
              <Button color="buttonColor" size='small' variant="text">Login</Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default Signup