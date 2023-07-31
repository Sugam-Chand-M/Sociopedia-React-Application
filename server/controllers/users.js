import User from "../models/User";

// Read operation in CRUD operations
export const getUser=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findById(id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(404).json({error:err.message});
    }
};

export const getUserFriends=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findById(id);
        const friends=await Promise.all( // for making multiple API calls we are using Promise
            user.friends.map((id)=>User.findById(id))
        );
        const formattedFriends=friends.map(({_id,firstName,lastName,occupation,location,picturePath})=>{
            return {_id,firstName,lastName,occupation,location,picturePath};
        });
        res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(404).json({error:err.message});
    }
};

// Update operation in CRUD operations