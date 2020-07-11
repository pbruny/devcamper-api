import User from '../models/User'
import SendCookie from '../utils/sendCookieToken'
class UserController {
  async store(req, res) {
    try {
      const { name, email, password, role } = req.body

      const user = await User.create({
        name,
        email,
        password,
        role
      })

      return SendCookie(user, 200, res)
      
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
  }

  async login(req, res) {
    const { email, password } = req.body

    if(!email || !password)  {
      return res.status(400).json({success: false, error: 'Please provide e-mail and password'})
    }

    const user = await User.findOne({ email }).select('+password')

    if(!user) {
      return res.status(401).json({success: false, error: 'Please provide valid credentials'})
    }

    const isMatch = await user.matchPassword(password)

    if(!isMatch) {
      return res.status(401).json({success: false, error: 'Please provide valid credentials'})
    }

    return SendCookie(user, 200, res)
  }

  async showLoggedUser(req, res) {
    try {
      const user = await User.findById(req.user.id)

    if(!user) {
      return res.status(400).json({success: false, error: 'User not found and/or invalid credentials'})
    }

    return res.status(200).json({success: true, user})
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body
      const user = await User.findOne({ email })

      if(!user) {
        return res.status(400).json({success: false, error: 'User not found and/or invalid credentials'})
      }

      const token = user.getResetPasswordToken()

      await user.save({ validateBeforeSave: false })

      res.status(200).json({success: true, token})
    } catch (err) {
      return res.status(400).json({success: false, error: err.message})
    }
  }
}

export default new UserController()