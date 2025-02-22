const User = require('../models/User');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');

const router = require('express').Router();

router.put('/:id', verifyTokenAndAuthorization, async(req,res)=>{
    if(req.body.password){
        //If a password update is requested, it is hashed using bcrypt before storing it in the database.
        const salt = await bcrypt.genSalt(16);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id,
            {
            $set: req.body
            },
            {new:true}
        );
        res.status(200).json(updateUser);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;