import mongoose from "mongoose";

const postSchema=mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        location:String,
        description:String,
        picturePath:String,
        userPicturePath:String,
        likes:{ // posts that the users will like will be added to a map and if unliked it will be removed
            type:Map,
            of:Boolean,
        },
        comments:{
            type:Array,
            default:[],
        }
    },
    {
        timestamps:true
    }
);

const Post=mongoose.model("Post",postSchema);
export default Post;