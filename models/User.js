const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  userId: String
})

mongoose.model('users', userSchema);
