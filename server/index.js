require('dotenv').config();
const express = require("express");
const app = express();
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');

//database connection
require('./db');

app.use(express.json());

app.use('/api/auth',authRoute);
app.use('/api/users',userRoute); 
app.use('/api/products',productRoute); 

app.listen(process.env.PORT || 5000 ,()=>{
    console.log("Server started at 5000");
});