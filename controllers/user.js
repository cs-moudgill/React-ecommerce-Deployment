const User = require("../models/user");
const { Order } = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.json({
        error: "No user was found in DB.",
      });
    }
    req.profile = user; // here req has got a new property called - profile.
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  console.log(req.profile);
  User.findByIdAndUpdate(
    { _id: req.profile._id }, // id to update
    { name: "Channpreet" }, // which field you want to update.
    { new: true, useFindAndModify: false }, //new is true means update will happen otherwise nothing will change.
    (err, user) => {
      if (err) {
        return res.json({
          error: "Can not be Updated",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined; // We don't want confidential information here.
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.json({
          error: "No order in this account",
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  User.findOneAndUpdate(
    {
      _id: req.profile._id,
    },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchase) => {
      if (err) {
        return res.json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};
