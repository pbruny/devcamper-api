import Mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10)

  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getSignedJWTToken = function() {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default Mongoose.model('User', UserSchema)