const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//Using custom fields because I am using email instead of username
const customFields = {
  usernameField: "email",
  passwordField: "password",
};

//This is the callback that verfies the account credentials
const callback = (username, password, done) => {
  User.findOne({ email: username }).then((user) => {
    if (!user) {
      return done(null, false);
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return err;
        }
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  });
};

//Creating a strategy based on the customfields and the callback
const strategy = new LocalStrategy(customFields, callback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
