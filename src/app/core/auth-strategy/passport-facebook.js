import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import User from '../database/models/user';
import config from '../constants/app-config';

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
      profileFields: ['id', 'first_name', 'last_name', 'email']
    },
    async (accessToken, refreshToken, {_json: profile}, done) => {
      try {
        // if user with same email exists, throw err
        const existingUserEmail = await User.findOne({
          where: {
            email: profile.email,
            socialId: null
          }
        });
        if (existingUserEmail) {
          return done(null, null, {
            status: 400,
            message: 'Email has been taken'
          });
        }

        // if user exists return the user
        const existingUser = await User.findOne({
          where: {
            socialId: profile.id
          }
        });
        if (existingUser) {
          return done(null, existingUser);
        }

        // if user does not exist create a new user
        const newUser = await User.create({
          socialId: profile.id,
          email: profile.email,
          firstName: profile.first_name,
          lastName: profile.last_name,
          isVerified: true
        });
        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);
