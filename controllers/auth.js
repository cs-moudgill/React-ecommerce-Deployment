const User = require("../models/user"); // import user mongoDB model
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  //Custom errors using express validator.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  //Error handling after submission.
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      res.status(400).json({
        err: "Not able to save user in DB",
      });
    }
    res.json(user);
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body; // es6 feature. we receive the user info here.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      // we have to use '!user' here because findOne() still providing empty response, not an error.
      return res.json({
        error: "User does not Exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.json({
        //why return word, because we do want to check further if there is an error.
        error: "user email and password do not match",
      });
    }

    //if authentication is successful then create token.
    var token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    // put the token in browser cookie.
    res.cookie("token", token, { expire: new Date() + 9999 });
    //send response to frontend.
    const { _id, name, email, role } = user; //es6--> user.name,user.role etc.
    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token"); //to clear the cookies generated(to keep the user logged in) during signin.
  res.send("signout success.");
};

exports.isLoggedIn = expressJwt({
  //expressJWT keeps the user logged in.
  secret: process.env.SECRET_KEY,
  userProperty: "auth",
  algorithms: ["HS256"],
  //we can name it anything through expressJwt.
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, ACCESS DENIED",
    });
  }
  next();
};
