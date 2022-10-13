const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users')

passport.serializeUser(( user, done ) => {
  console.log("serialized user", user)
  done(null, user.id)   // for each instance of user the mongo assigns each record an id and that id we are fetching as user.id
} )

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    console.log("deserialized user", user)
    done(null, user);
  })  // this will find the user associated with the record with record id 'id'
})

passport.use(new GoogleStrategy({
  clientID: keys.googleClientId,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, (accessTokens, refreshToken, profile, done) => {
    User.findOne( { googleId: profile.id } ).then((existingUser) => {
        if(existingUser) {
          console.log(existingUser,"existinguser")
          //we already have a record with a given profile id
          done(null, existingUser)
          // to signal passport that the authentication flow is completed and the process and proceed further we have to call done() function.
        }
        else {
          // we don't have a record with this id, make a new record
          new User( { googleId: profile.id } )
          .save()
          .then((user) => {
            console.log(user, "newuser")
            done(null, user); // done accepts two arguments, the first argument is to report if there has been an error and second argument will tell the successfully authenticated user
          })
        }
      })
 }
))
