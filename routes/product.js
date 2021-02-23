var express = require("express");
var router = express.Router();
const { getUserById } = require("../controllers/user");
const {
  getProductById,
  createProduct,
  getProduct,
  mediaHandling,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
  updateStockSold,
} = require("../controllers/product");
const { isLoggedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//params
router.param("userId", getUserById);
router.param("productId", getProductById);

//Create routes
router.post(
  "/product/create/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//Read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", mediaHandling);

//Delete route
router.delete(
  "/product/:productId/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//Update route
router.put(
  "/product/:productId/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
