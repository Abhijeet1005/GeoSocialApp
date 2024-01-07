const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGOURI);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String
      },
      fullname: {
        type: String,
        required: true,
      },
      posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }],
      email: {
        type: String,
        required: true,
        unique: true,
      },
      dp: {
        type: String,
        default: null,
      },
      geo: {
        type: String,
        default: null,
      }
})
userSchema.plugin(plm)

module.exports = mongoose.model('User',userSchema)
