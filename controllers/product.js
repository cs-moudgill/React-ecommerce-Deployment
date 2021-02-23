const Product = require("../models/product");
const formidable = require("formidable");
var _ = require("lodash");
var fs = require("fs");
const { sortBy } = require("lodash");

exports.getProductById = (req, res, next, id) => { //id here means productId.
  Product.findById(id).exec((err, product) => {
    if (err) {
      return res.json({
        error: "Product not found",
      });
    }
    req.product = product;
    next();
  });
};

exports.createProduct = (req, res) => {
  var form = formidable.IncomingForm();
  form.keepExtensions = true; //if we want to keep the extension of image/object.
  form.parse(req, (err, fields, file) => {
    //field=info related to image/object; file=image/object itself.
    if (err) {
      return res.json({
        error: "Problem with Image",
      });
    }
    //Destructing of fields
    const { name, description, price, category, stock } = fields;
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "All fields must be completed",
      });
    }
    var product = new Product(fields); //info related to image will be store according to the product Schema.
    //file handling photo/object
    if (file.photo) {
      if (file.photo.size > 3000000) {  //3MB
        return res.json({
          error: "File is too big to upload",
        });
      }
      // here fs will ask the formidable to provide the path of the file uploaded by the user.
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //Save to DB
    product.save((err, product) => {
      if (err) {
        return res.json({
          error: "Saving item in DB failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct=(req,res)=>{
  req.product.photo.data=undefined; //to empty media file so that result can be returned without any delay.
  return res.send(req.product);  //returned from getProductById.
}

//Middleware for photo (in this case)
exports.mediaHandling=(req,res,next)=>{
  if(req.product.photo.data){
    res.set('Content-Type',req.product.photo.contentType); //image/png
    return res.send(req.product.photo.data);
  }
  next();
}

//Delete
exports.deleteProduct=(req,res)=>{
  let product=req.product;
  product.remove((err,deletedProduct)=>{
    if(err){
      return res.status(400).json({
        error:'Failed to delete the product'
      })
    }
    res.json({
      message:'Deletion was a success',
      deletedProduct
    });
  });
}

//Updation
exports.updateProduct=(req,res)=>{
  var form = formidable.IncomingForm();
  form.keepExtensions = true; //if we want to keep the extension of image/object.
  form.parse(req, (err, fields, file) => {
    //field=info related to image/object; file=image/object itself.
    if (err) {
      return res.json({
        error: "Problem with Image",
      });
    }
   
    //below 2 lines are doing the updation process.
    var product = req.product;
    product=_.extend(product,fields); //lodash is in operation here.
    //Above, product=what we get from the productById fn.
    //and fields are what the user types and contains information about image.

    //file handling photo/object
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.json({
          error: "File is too big to upload",
        });
      }
      // here fs will ask the formidable to provide the path of the file uploaded by the user.
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //Save to DB
    product.save((err, product) => {
      if (err) {
        return res.json({
          error: "Updation in DB failed",
        });
      }
      res.json(product);
    });
  });
}

exports.getAllProducts=(req,res)=>{
  let limit=req.query.limit ? parseInt(req.query.limit) : 8; //ternary operator.
  let sortBy=req.query.sortBy ? req.query.sortBy : '_id'; //sort by product id.
  Product.find()
  .select('-photo') // here, i am telling lodash method to not to load photo.
  .populate('category')
  .sort([[sortBy,'asc']]) //ascending order
  .limit(limit) // maximum product list to be displayed.
  .exec((err,products)=>{
    if(err){
      return res.json({
        error:'Products are not able to display'
      })
    }
    res.json(products);
  })
}

//to provide the unique category name.
exports.getAllUniqueCategories=(req,res)=>{
  Product.distinct('category',{},(err,category)=>{
    if(err){
      return res.json({
        error:'No category found'
      })
    }
    res.json(category);
  })
}

//when something is sold then stock value should go down accordingly.
//below we are using bulkWrite method from Mongoose.
exports.updateStockSold=(req,res,next)=>{
  let operation=req.body.order.products.map((prod)=>{
    return {
      updateOne:{
        filter:{_id:prod._id}, //which item to update.
        update:{$inc:{stock:-prod.count,sold:+prod.count}} //what to update in that item.
      }
    }
  });
  //it requires 3 thing-- operation to be performed..
  //..options includes any conditions we want to set..
  //..callback function.
  Product.bulkWrite(operation,{},(err,products)=>{
    if(err){
      return res.json({
        error:'Bulk operation failed'
      })
    }
    next();
  })
}


