import jwt from 'jsonwebtoken'
import User from '../models/User'
import { promisify } from 'util'

export default async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token was not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id)

    if(!req.user) {
      return res.status(404).json({success: false, error: 'User not found'})
    }

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token inavalid' })
  }
}