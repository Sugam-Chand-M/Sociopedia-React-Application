import bcrypt from "bcrypt"; // A library to help you hash passwords.
import jwt from "jsonwebtoken"; // JSON Web Token (JWT) is a compact URL-safe means of representing claims to be transferred between two parties
import User from "../models/User.js";

// Register Users
export const register=async(req,res)=>{ // call to the mongodb must be asynchronous, therefore using async function. req-request body from the frontend, res-response body sending back to the frontend
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        }=req.body;
        const salt=await bcrypt.genSalt(); // random salt given by bcrypt to encrypt the password
        const passwordHash=await bcrypt.hash(password,salt); // to hide the password i.e., password is encrypted such that it is not exposed
        const newUser=new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random()*10000), // assigning some dummy value initially
            impressions:Math.floor(Math.random()*10000)
        });
        const savedUser=await newUser.save(); // to save the user
        res.status(201).json(savedUser); // send a user back if it does not error out
    }
    catch(err){
        res.status(500).json({error:err.message}); // to return error message
    }
};

// Logging in feature
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email}); // using mongoose to find the one that has the specified email and fetch all the details
        if(!user)
            return res.status(400).json({msg:"User does not exist."});
        const isMatch=await bcrypt.compare(password,user.password); // since they use the same salt they can be compared whether the stored password in the db is the same or not
        if(!isMatch)
            return res.status(400).json({msg:"Invalid Credentials."});
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password; // to avoid sending the password back to the frontend
        res.status(200).json({token,user});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};