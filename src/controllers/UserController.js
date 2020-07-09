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

    // const options = {
    //   expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 86400000),
    //   httpOnly: true
    // }

    // const token = user.getSignedJWTToken()

    // return res.status(200).cookie('token', token, options).json({success: true, token})
    return SendCookie(user, 200, res)
  }
}

export default new UserController()