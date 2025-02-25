const User = require('../models/User');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();

//UPDATE
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
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password:_, ...userData} = user._doc;
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error)
    }
});

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async(req,res)=>{
    const query = req.query.new;
    try { 
        const users = query 
        ? await User.find().sort({_id: -1}).limit(1) 
        : await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
    //user statistics per month
    try {
        // Perform aggregation to get user statistics
        const data = await User.aggregate([
            // Step 1: Filter users created within the last year
            {$match: { createdAt: {$gte: lastYear} } },
            // Step 2: Extract the month number from the createdAt field
            {
                $project:{
                    month: {$month: "$createdAt"},
                },
            },
            // Step 3: Group users by month and count the total users per month
            {
                $group:{
                    _id: "$month",  // Group by month number, Referencing the extracted month field
                    total: { $sum: 1 },  // Count users in each month
                }
            }
        ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;

/*
In the MongoDB aggregation pipeline, when we use field names inside expressions, we must prefix them with $ so that MongoDB 
knows we're referring to a field in the document rather than a literal value.
in MongoDB's aggregation pipeline, whenever we reference a field inside an operator like $group, we must prefix it with $
*/