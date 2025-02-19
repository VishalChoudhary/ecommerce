const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//REGISTER
router.post("/register", async(req,res)=>{
    const {username, email, password} = req.body;

    try{
        // Hash password before saving to DB
        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create new user
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
        });

        //save user in DB
        const savedUser = await newUser.save();
        const { password:_ , ...userData} = savedUser._doc;
        res.status(201).json(userData);
    } catch(err){
        res.status(500).json(err);
    }
});

//LOGIN

router.post('/login',async(req,res)=>{
    const {username, password} = req.body;
    try{
        //find user in DB
        const user = await User.findOne({username});
        if(!user)
            return res.status(401).json("User Not Found!");

        //compare passwords using bcrypt
        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword)
            return res.status(401).json("Wrong Credentials!");

        const { password:_ , ...userData} = user._doc;
        res.status(201).json(userData);

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;