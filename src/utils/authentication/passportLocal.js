/* eslint-disable object-curly-spacing */
import passport from 'passport'
import User from '../../models/user'
// eslint-disable-next-line object-curly-spacing
import { Strategy as LocalStrategy } from 'passport-local'

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findByPk(id, function (err, user) {
    done(err, user)
  })
})

passport.use(
  'classroom.login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      // eslint-disable-next-line object-curly-spacing
      User.findOne({ where: { email: email } }).then((user, err) => {
        if (err) return done(err)

        if (!user)
          return done(null, false, { status: 400, message: 'User not found' })

        if (!user.comparePassword(password))
          return done(null, false, {
            status: 400,
            message: 'Incorrect Password'
          })

        return done(null, user)
      })
    }
  )
)

passport.use(
  'classroom.signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      User.findOne({ where: { email: email } }).then((user, err) => {
        if (err) return done(err)

        if (user)
          // eslint-disable-next-line object-curly-spacing
          return done(null, false, { status: 400, message: 'Email is taken' })

        const userDataForSignUp = {
          username: req.body.username,
          email: email,
          password: password
        }

        // eslint-disable-next-line no-unused-vars
        User.create(userDataForSignUp).then(function (newUser, created) {
          if (!newUser) {
            return done(null, false)
          }

          if (newUser) {
            return done(null, newUser)
          }
        })
      })
    }
  )
)
