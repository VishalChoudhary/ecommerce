require('dotenv').config();
const express = require("express");
const app = express();

//database connection
require('./db');

app.listen(process.env.PORT || 5000,()=>{
    console.log("Server started at 5000");
});