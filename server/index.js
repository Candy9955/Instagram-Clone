const express = require("express");
const path = require("path");
const db = require('./db.js');
const { User, Photos } = require('./db.js');
const fileUpload = require('express-fileupload')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { default: axios } = require("axios");

const uploadPath = path.join(__dirname, '/upload')
const app = express();

app.use(express.json());
app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'upload')))

app.post('/signup', (req, res) => {
  const data = req.body
  let user = new User(data)
  User.find({ userName: data.userName })
    .then(item => {
      if (item.length === 0) {
        user.save()
          .then(result => { res.send('sign up sucess') })
      } else {
        res.send('user exist')
      }
    })
})

app.post('/login', (req, res) => {
  const data = req.body
  let user = new User(data)
  User.find({ email: data.email, passWord: data.passWord })
    .then(item => {
      if (item.length > 0) {
        res.send(['success', item[0]])
      } else {
        res.send('fail')
      }
    })
})

app.post('/uploadProfile', (req, res) => {
  const { files } = req
  const { username, createdAt } = req.body
  const image = files.image
  const extension = '.' + image.name.split('.')[1]
  const folderName = path.join(uploadPath, username)
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, (err) => { console.log(err) })
  }
  const fileName = uuidv4() + extension;
  const filePath = path.join(folderName, fileName)
  const fileUrl = path.join('/', username, fileName)

  image.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      User.findOneAndUpdate({ userName: username }, { profile: fileUrl })
        .then(() => res.send(fileUrl))
    }
  })
})

app.post('/uploadPhoto', (req, res) => {
  const { files } = req
  const { username, createdAt, captions } = req.body
  const image = files.image
  const extension = '.' + image.name.split('.')[1]
  const folderName = path.join(uploadPath, username)
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, (err) => { console.log(err) })
  }
  const fileName = uuidv4() + extension;
  const filePath = path.join(folderName, fileName)
  const photoUrl = path.join('/', username, fileName)

  image.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      const photo = new Photos({ username, createdAt, photo: photoUrl, captions })
      photo.save()
        .then(result => {
          res.send(result)
        })
    }
  })
})


app.post('/getUserPhotos', (req, res) => {
  const { username } = req.body
  if (username) {
    Photos.find({ username: username })
      .then(data => res.send(data))
  } else {
    res.send([])
  }
})

app.get('/getAllPhotos', (req, res) => {
  Photos.find()
    .then(data => res.send(data))
})

app.get('/getAllUsers', (req, res) => {
  User.find()
    .then(data => res.send(data))
})

app.post('/findUsers', (req, res) => {
  const { username } = req.body
  if (username) {
    User.find({ userName: username })
      .then(data => res.send(data))
  } else {
    res.send([])
  }
})

app.post('/follow', (req, res) => {
  const { username, follows } = req.body
  User.find({ userName: username })
    .then(data => {
      following = data[0].following
      if (!following.includes(follows)) {
        following.push(follows)
      } else {
        following = following.filter(x => x !== follows)
      }
      User.findOneAndUpdate({ userName: username }, { following })
        .then(() => { })
    })
  User.find({ userName: follows })
    .then(data => {
      followers = data[0].followers
      if (!followers.includes(username)) {
        followers.push(username)
      } else {
        followers = followers.filter(x => x !== username)
      }
      User.findOneAndUpdate({ userName: follows }, { followers })
        .then(() => { })
    })
  res.send()
})

app.post('/newComment', (req, res) => {
  const { newComment, photo, username } = req.body
  let comment = { username, newComment }
  Photos.findOneAndUpdate({ photo }, { $push: { comments: comment } })
    .then(data => res.send('sucess insert new comment'))
})

app.post('/likes', (req, res) => {
  const { photo } = req.body
  Photos.findOneAndUpdate({ photo }, { $inc: { 'likes': 1 } })
    .then(data => res.send('likes'))
})


const port = process.env.PORT || 3001
app.listen(port);
console.log(`Listening at http://localhost:${port}`);