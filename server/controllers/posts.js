import Post from "../models/Post.js";
import User from "../models/User.js";

// Create operation in CRUD operation
export const createPost=async(req,res)=>{
    try{
        const {userId,description,picturePath}=req.body;
        const user=await User.findById(userId);
        const newPost=new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{},
            comments:[]
        });
        await newPost.save(); // to save the posts in mongodb
        const post=await Post.find();  // returns all the posts
        res.status(201).json(post);
    }
    catch(err){
        res.status(409).json({message:err.message});
    }
};

// Read operation in CRUD operation
export const getFeedPosts=async(req,res)=>{
    try{
        const post=await Post.find();  // returns all the posts
        res.status(201).json(post);
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
};

export const getUserPosts=async(req,res)=>{
    try{
        const {userId}=req.params;
        const post=await Post.find({userId});  // grabs user feed posts
        res.status(200).json(post);
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
};

// Update operation in CRUD operation
export const likePost=async(req,res)=>{
    try{
        const {id}=req.params;
        const {userId}=req.body;
        const post=await Post.findById(id);
        const isLiked=post.likes.get(userId); // check in the likes whether the userId exists which means the post has been liked by that particular person
         if(isLiked)
            post.likes.delete(userId); // deletes if it already exists 
        else
            post.likes.set(userId,true); // sets if it does not exist
        const updatedPost=await Post.findByIdAndUpdate( // for updating the frontend once we hit the like button
            id,
            {likes:post.likes}, // list of likes that is modified
            {new:true}
        );
        res.status(200).json(updatedPost); // sending the data to the frontend
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
};