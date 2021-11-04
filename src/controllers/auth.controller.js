import passport from 'passport'
import {
  generateAccessToken,
  generateRefreshToken
} from '../services/auth.service'

const authLogin = async (req, res, next) => {
  passport.authenticate('classroom.login', function (err, user, info) {
    if (err) res.status(500).send(err)

    if (info) {
      res.status(info.status).send(info.message)
    } else {
      const accessToken = generateAccessToken(user.dataValues)
      const refreshToken = generateRefreshToken(user.dataValues)
      // eslint-disable-next-line object-curly-spacing
      const { id, username, email } = user.dataValues
      // eslint-disable-next-line object-curly-spacing
      const responseData = { id, username, email, accessToken, refreshToken }
      res.status(200).send(responseData)
    }
  })(req, res, next)
}

const authSignup = async (req, res, next) => {
  passport.authenticate('classroom.signup', function (err, user, info) {
    if (err) res.status(500).send(err)

    if (info) {
      res.status(info.status).send(info.message)
    } else {
      res.status(200).send(user.dataValues)
    }
  })(req, res, next)
}

// eslint-disable-next-line no-unused-vars
const authLogout = async (req, res, next) => {
  req.logout()
  res.status(200).send('SUCCESS')
}

// eslint-disable-next-line object-curly-spacing
export default { authLogin, authSignup, authLogout }
