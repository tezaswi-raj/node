const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users')

passport.use(new GoogleStrategy({
  clientID: keys.googleClientId,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessTokens, refreshToken, profile, done) => {
    User.findOne( { googleId: profile.id } ).then((existingUser) => {
        if(existingUser) {
          //we already have a record with a given profile id

        }
        else {
          // we don't have a record with this id, make a new record
          new User( { googleId: profile.id } ).save()
        }
      })
 }
))
