import jwt from 'jsonwebtoken'

const generateAccessToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET_KEY_TOKEN)
}

const generateRefreshToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET_KEY_REFRESH_TOKEN)
}

// eslint-disable-next-line object-curly-spacing
export { generateAccessToken, generateRefreshToken }
