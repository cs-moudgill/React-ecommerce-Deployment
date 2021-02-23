require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const orderRoutes=require('./routes/order');
const paymentBRoutes=require('./routes/paymentBRoutes');
const path = require('path');

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// Making build folder as Public.
app.use(express.static(path.join(__dirname, 'projfront','build')));


//DB

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(()=>{
    console.log('DB CONNECTED');
}).catch(()=>{
    console.log('Oops!!!!, something went wrong in connecting with DB');
});


//Routes
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);
app.use('/api',paymentBRoutes);



  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,"projfront", "build", "index.html"));
  });

//Port
app.listen(process.env.PORT || 8000, () => {
  console.log("Running");
});
