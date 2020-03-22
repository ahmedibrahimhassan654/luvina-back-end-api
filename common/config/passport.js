/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const config = require('./config');
const User = require('../../modules/user/user.schema');

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.key,
  algorithms: ['HS256']
};

passport.use(
  'jwt',
  new JwtStrategy(jwtOpts, async (payload, done) => {
    try {
      const user = await User.findById(payload._id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  new LinkedInStrategy(
    {
      clientID: config.linkedIn.clientId,
      clientSecret: config.linkedIn.clientSecret,
      callbackURL: config.linkedIn.callbackURL,
      scope: ['r_emailaddress', 'r_basicprofile'],
      state: true // Used to prevent CSRF attacks & required by the LinkedIn API
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value || profile._json.email;
        const { id: linkedInId, displayName: fullName } = profile;
        const { first_name: firstName, last_name: lastName } = profile._json;
        let user = await User.findOne({ linkedInId });
        if (!user) {
          user = await User.create({
            linkedInId,
            fullName: fullName || `${firstName} ${lastName}`,
            email
          });
        }
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebook.clientId,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
      profileFields: [
        'id',
        'displayName',
        'email',
        'first_name',
        'last_name',
        'link'
      ]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value || profile._json.email;
        const { id: facebookId, displayName: fullName } = profile;
        const { first_name: firstName, last_name: lastName } = profile._json;
        let user = await User.findOne({ facebookId });
        if (!user) {
          user = await User.create({
            facebookId,
            fullName: fullName || `${firstName} ${lastName}`,
            email
          });
        }
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value || profile._json.email;
        const { id: googleId, displayName: fullName } = profile;
        const { first_name: firstName, last_name: lastName } = profile._json;
        let user = await User.findOne({ googleId });
        if (!user) {
          user = await User.create({
            googleId,
            fullName: fullName || `${firstName} ${lastName}`,
            email
          });
        }
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

module.exports = passport;
