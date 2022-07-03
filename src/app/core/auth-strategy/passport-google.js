import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth2';
import User from '../database/models/user';
import config from '../constants/app-config';

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
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
            message: 'error.takenEmail'
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
          firstName: profile.given_name,
          lastName: profile.family_name,
          isVerified: true,
          avatar: profile?.picture || null,
          googleTokens: {
            access_token: accessToken,
            refresh_token: refreshToken
          }
        });
        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);
