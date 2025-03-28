require('dotenv').config();
const express = require("express");
const app = express();
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const cors = require('cors');

//database connection
require('./db');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api/auth',authRoute);
app.use('/api/users',userRoute); 
app.use('/api/products',productRoute); 
app.use('/api/carts',cartRoute); 
app.use('/api/orders',orderRoute); 
app.use('/api/checkout',stripeRoute); 

app.listen(process.env.PORT || 5000 ,()=>{
    console.log("Server started at 5000");
});