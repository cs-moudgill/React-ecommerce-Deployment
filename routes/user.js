var express = require("express");
var router = express.Router();
const { getUserById, getUser,updateUser,userPurchaseList } = require("../controllers/user");
const { isLoggedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById); //user information generated here based on user _id.
router.get("/user/:userId", isLoggedIn, isAuthenticated, getUser);
router.put("/user/:userId",isLoggedIn,isAuthenticated,updateUser); //This will fire the router.param middleware.
router.get("/orders/user/:userId",isLoggedIn,isAuthenticated,userPurchaseList); 


module.exports = router;