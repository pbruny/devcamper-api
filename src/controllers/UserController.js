import User from '../models/User'

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

      const token = user.getSignedJWTToken()

      return res.status(201).json({success: true, token})
      
    } catch (err) {
      return res.status(400).json({success: false, err})
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

    const token = user.getSignedJWTToken()

    return res.status(200).json({success: true, token})
  }
}

export default new UserController()