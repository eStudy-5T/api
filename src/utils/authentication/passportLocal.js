import passport from 'passport';
import User from '../../app/database/models/user';
import {Strategy as LocalStrategy} from 'passport-local';

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  'meettutor.login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      User.findOne({where: {email: email}}).then((user, err) => {
        if (err) return done(err);

        if (!user)
          return done(null, false, {
            status: 400,
            message: 'error.userNotFound'
          });

        if (!user.comparePassword(password))
          return done(null, false, {
            status: 400,
            message: 'error.incorrectPassword'
          });

        return done(null, user);
      });
    }
  )
);

passport.use(
  'meettutor.signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      User.findOne({where: {email: email}}).then((user, err) => {
        if (err) return done(err);

        if (user)
          return done(null, false, {status: 400, message: 'error.takenEmail'});

        const userData = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: email,
          password: password
        };

        User.create(userData).then(function (newUser) {
          if (!newUser) {
            return done(null, false);
          }

          if (newUser) {
            return done(null, newUser);
          }
        });
      });
    }
  )
);
