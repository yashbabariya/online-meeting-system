const localStrategy = require("passport-local").Strategy;
const mongoose = require('mongoose');

// //Load User Data
const User = require('../schema/user');

const passportAuthenticator = (passport, User) => {
  passport.use(
    new localStrategy({ usernameField: 'username' }, (username, password, done) => {

      //match User
      User.findOne({ username: username })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'Username is not registered' });
          }
          //match Password
          if ((user, user.password == password)) done(null, user);
          else return done(null, false, { message: "Password Incorrect" });
        })
    })
  )
  passport.serializeUser((data, done) => {
    return done(null, data.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, data) => {
      return done(null, data);
    });
  });
}
module.exports = passportAuthenticator;

