var express = require("express");
var router = express.Router();
const { getUserById } = require("../controllers/user");
const { getCategoryById, createCategory,getCategory,getAllCategories,updateCategory,deleteCategory } = require("../controllers/category");
const { isLoggedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//create
router.post("/category/create/:userId",isLoggedIn,isAuthenticated,isAdmin,createCategory);

//read
router.get('/category/:categoryId',getCategory);
router.get('/categories',getAllCategories);

//update
router.put('/category/:categoryId/:userId',isLoggedIn,isAuthenticated,isAdmin,updateCategory);

//delete
router.delete('/category/:categoryId/:userId',isLoggedIn,isAuthenticated,isAdmin,deleteCategory);


module.exports = router;