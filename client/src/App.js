import React from 'react'
import './App.css'
import Box from '@mui/material/Box';
import User from './components/User/User'
import Home from './components/Home/Home';
import Login from './components/Login/Login.js'
import Signup from './components/Login/Signup.js'
import NewComment from './components/NewComment/NewComment'
import {
  BrowserRouter as Router, Route, Routes,
} from "react-router-dom";
import Main from './components/Main'
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      fullName: '',
      profile: '',
      followers: [],
      following: [],
      userPostLength: 0
    }
  }
  handleLoginUser = (username, fullName, profile, followers, following) => {
    this.setState({ username, fullName, profile, followers, following })
  }

  handleProfile = (profile) => {
    this.setState({ profile })
  }

  handleUserPostLength = (userPostLength) => {
    this.setState({ userPostLength })
  }

  render() {
    const { username, fullName, profile, followers, following, userPostLength } = this.state
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Main profile={profile} username={username} />}>
            <Route index element={<Login handleLoginUser={this.handleLoginUser} />} />
            <Route path='home' element={<Home username={username} fullName={fullName} profile={profile} />} />
            <Route path='user'
              element={<User
                username={username}
                fullName={fullName}
                handleProfile={this.handleProfile}
                profile={profile}
                followers={followers}
                following={following}
                userPostLength={userPostLength}
                handleUserPostLength={this.handleUserPostLength}
              />} />
          </Route>
          <Route path='/login' element={<Login handleLoginUser={this.handleLoginUser} />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router >
    )
  }
}

export default App
