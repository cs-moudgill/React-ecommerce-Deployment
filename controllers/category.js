const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.json({
        error: "Category not found in DB",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body); //because it has only one field to store and that is already in json form.
  category.save((err, category) => {
    if (err) {
        return res.json({
        error: "Not able to save category in DB",
      });
    }
    res.json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.json({
        error: "No categories found",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name; //Right statement is what admin want to update from frontend.
  category.save((err, updatedCategory) => {
    if (err) {
      return res.json({
        error: "Failed to update category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.json({
        error: "Failed to delete category",
      });
    }
    res.json({
      message: "successfully deleted",
    });
  });
};
