var express = require("express");
var router = express.Router();
const { getUserById,pushOrderInPurchaseList } = require("../controllers/user");
const { isLoggedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {updateStockSold}=require('../controllers/product')
const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus}=require('../controllers/order');


//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//create
router.post('/order/create/:userId',isLoggedIn, isAuthenticated,pushOrderInPurchaseList,updateStockSold,createOrder);

//read
router.get('/order/all/:userId',isLoggedIn,isAuthenticated,isAdmin,getAllOrders);
router.get('/order/status/:userId',isLoggedIn,isAuthenticated,isAdmin,getOrderStatus);

//update
router.put('/order/:orderId/status/:userId',isLoggedIn,isAuthenticated,isAdmin,updateStatus);


module.exports = router;