const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//Takes in the user credentials and uses passport to authenticate the user
//If the users credentials are correct the user id well be sent back as a response
router.route("/login").post((req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      res.send("An error has occured");
    }
    if (!user) {
      res.send("User does not exist or password is incorrect");
    } else {
      req.logIn(user, (err) => {
        if (err) {
          res.send("An error has occured");
        } else {
          res.send({ user: user._id });
        }
      });
    }
  })(req, res, next);
});

//Takes in the user info for creating a new account
//Checks to see if the email given is already associated with an account
//If successful we create a newuser and save it to the DB
//We then send back the response of success
router.route("/register").post((req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  let password = req.body.password;

  User.findOne({ email: email }, async (err, exists) => {
    if (err) {
      res.send("An error has occured");
    }
    if (exists) {
      res.send("User with that email already exists");
    }
    if (!exists) {
      password = await bcrypt.hash(password, 10);
      const newUser = new User({
        first_name,
        last_name,
        email,
        password,
      });

      newUser.save();
      res.send("success");
    }
  });
});

//Find a user associated with an id and updates the password
router.route("/:id").patch(async (req, res) => {
  let password = await bcrypt.hash(req.body.password, 10);
  User.findByIdAndUpdate(req.params.id, { password: password })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Find a user associated with an id and deletes the account
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id).catch((err) =>
    res.status(400).json("Error: " + err)
  );
});
module.exports = router;
