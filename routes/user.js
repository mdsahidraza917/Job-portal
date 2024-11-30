const express = require("express")
const router = express.Router();
const User = require("../Schema/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.post("/register", async (req,res)=>{
    const {name,email,mobile,password} = req.body;
    const isUserExist = await User.findOne({email});
    const hashedPass = await bcrypt.hash(password,10);
    if(isUserExist){
        return res.status(400).json({message:"User already Exist"});
    }
    try{
        const user = await User.create({
            name,
            email,
            mobile,
            password:hashedPass
        });
        res.status(200).json({message:"User Created"});
    }
    catch{
        console.log(err);
        res.status(500).json({messgae:"Error in creating User"});
    }
})
router.post("/login", async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }
    try{
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return res.status(400).json({message:"Invalid Password"});
        }
        const payload = {
            id: user._id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({ token });
    }
    catch{
        console.log(res);
        res.status(500).json({message:"Unable to login"});
    }
})
module.exports = router;