const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const userRegex = /^[A-Za-z0-9]+$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/;

module.exports = function(passport){
  // Local Strategy
  passport.use(new LocalStrategy(function(username, password, done){
    // Match Username

    // check is username is used as username
    if (!(userRegex).test(username)) {
      // check if email is used as username
      if (!(emailRegex).test(username)) {
        return done(null, false, {message: 'Your username and/or password is incorrect.'});
      } else {
        let query = {email:username};

        User.findOne(query, function(err, user){
          console.log(`Login error: ${err}`)
          if(err) throw err;
          if(!user){
            return done(null, false, {message: 'No user found'});
          }
          // Match Password
          bcrypt.compare(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
              return done(null, user);
            } else {
              return done(null, false, {message: 'Wrong password'});
            }
          });
        });
      }

    } else {
      let query = {username:username};

      User.findOne(query, function(err, user){
        console.log(`Login error: ${err}`)
        if(err) throw err;
        if(!user){
          return done(null, false, {message: 'No user found'});
        }
        // Match Password
        bcrypt.compare(password, user.password, function(err, isMatch){
          if(err) throw err;
          if(isMatch){
            return done(null, user);
          } else {
            return done(null, false, {message: 'Wrong password'});
          }
        });
      });
    }

  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
    console.log("Done serializing " + user.id)
    console.log("Going to change last login date.");
    User.findById(user.id, function(err, user) {
      let loginDate = new Date();
      user.lastLogin = loginDate;
      user.save(function(err) {
        if (err) { return console.log("Login date save fail: ", err)};
      })
    })
  });

  passport.deserializeUser(function(id, done) {
    console.log("Deserializing")

    User.findById(id, function(err, user) {
      console.log("Found serialized user")
      done(err, user);
    });
  });
}