import User from "../models/User.js";

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
export const addRemoveFriend=async(req,res)=>{
    try{
        const {id,friendId}=req.params;
        const user=await User.findById(id);
        const friend=await User.findById(friendId);
        if(user.friends.includes(friendId)){ // friendId already part of the main list then we need to remove
            user.friends=user.friends.filter((id)=>id!==friendId); // a new array is created using filter() where it adds the element if it passes a given/certain condition
            friend.friends=friend.friends.filter((id)=>id!==id);
        }
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
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