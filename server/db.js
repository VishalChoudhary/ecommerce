const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('DB Connection Successful');
    }).catch((error)=>{
    console.log('Error connecting to database: ' + error.message);
})