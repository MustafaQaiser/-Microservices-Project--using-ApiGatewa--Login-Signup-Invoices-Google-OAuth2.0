const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: '690917620279-vi39aachnhl7cqcrut0ph2q850u78cv2.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  // Save or retrieve user information in your database as needed
  // The 'profile' object contains user details provided by Google
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
