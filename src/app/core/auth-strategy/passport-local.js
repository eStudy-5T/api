import get from 'lodash/get';
import passport from 'passport';
import User from '../../core/database/models/user';
import {Strategy as LocalStrategy} from 'passport-local';
import userService from '../../libs/api-user/user.service';

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
    async function (req, email, password, done) {
      try {
        const user = await User.findOne({where: {email: email}});

        if (!user || !user.password) {
          return done(null, false, {
            status: 400,
            message: 'error.userNotFound'
          });
        }

        if (!user.comparePassword(password) || !password) {
          return done(null, false, {
            status: 400,
            message: 'error.incorrectPassword'
          });
        }

        const isAdmin = await userService.validateUserHaveAdminPermissions(
          user.id
        );
        user.isAdmin = isAdmin;
        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
      }
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
          firstName: get(req, 'body.firstName'),
          lastName: get(req, 'body.lastName'),
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
