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
      const { id, username, email } = user.dataValues
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

const authLogout = async (req, res) => {
  req.logout()
  res.status(200).send('SUCCESS')
}

export default { authLogin, authSignup, authLogout }
