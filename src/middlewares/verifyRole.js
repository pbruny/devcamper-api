const verifyRole = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) {
      return res.status(403).json({success: false, error: `User with role ${req.user.role} is not authorized to access this route`})
    }

    return next()
  }
}

export default verifyRole