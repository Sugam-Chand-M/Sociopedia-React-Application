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
            
        });
    }
    catch(err){

    }
}