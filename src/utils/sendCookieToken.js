const sendCookieToken = (user, statusCode, res) => {
    const token = user.getSignedJWTToken()

    const options = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 86400000),
      httpOnly: true
    }

    return res.status(statusCode).cookie('token', token, options).json({success: true, token})
}

export default sendCookieToken