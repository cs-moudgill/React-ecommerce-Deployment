var express = require("express");
var router = express.Router();
const { signup, signout, signin, isLoggedIn } = require("../controllers/auth");
const { check } = require("express-validator");

router.post(
  "/signup",
  [
    check("name").isLength({ min: 3 }).withMessage('Name Should be of min 3 characters'),
    check("email").isEmail().withMessage('email is required'),
    check("password").isLength({min: 3,}).withMessage('password should be of least 3 characters'),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email field is required").isEmail(),
    check("password", "password should be of least 3 characters").isLength({min: 3}),
  ],
  signin
);

router.get("/signout", signout);

router.get("/protected", isLoggedIn, (req, res) => {
  console.log(req.auth);
});

module.exports = router;
