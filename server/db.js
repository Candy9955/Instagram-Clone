const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/instagram', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let userSchema = mongoose.Schema({
  email: String,
  fullName: String,
  userName: String,
  passWord: String,
  followers: Array,
  following: Array,
  profile: String,
  likeArr: Array
});

let photosSchema = mongoose.Schema({
  username: String,
  photo: String,
  comments: Array,
  createdAt: Date,
  captions: String,
  likes: { type: Number, default: 0 }
});

let User = mongoose.model('users', userSchema);
let Photos = mongoose.model('photos', photosSchema);

module.exports.User = User;
module.exports.Photos = Photos;
