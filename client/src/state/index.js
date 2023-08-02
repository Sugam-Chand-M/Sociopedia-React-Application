// redux functionalities
import { createSlice } from "@reduxjs/toolkit"; // A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

const initialState={
    mode:"light",
    user:null,
    token:null,
    posts:[],
};

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{ // actions that basically can be picked up as functions
        setMode:(state)=>{ // function/action for changing from light mode to dark mode and vice versa
            state.mode=state.mode==="light"?"dark":"light";
        },
        setLogin:(state,action)=>{ // basically includes all the arguments/parameters passed
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        setLogout:(state)=>{ // once we logout, this function is used to set the user and token to null value
            state.user=null;
            state.token=null;
        },
        setFriends:(state,action)=>{ // if the user exists add them to the friends list
            if(state.user)
                state.user.friends=action.payload.friends;
            else
                console.error("user friends non-existent !!!");
        },
        setPosts:(state,action)=>{ // just sets the posts
            state.posts=action.payload.posts;
        },
        setPost:(state,action)=>{ //
            const updatedPosts=state.posts.map((post)=>{
                if(post._id===action.payload.post_id) // if there are no changes to the post just return it
                    return action.payload.post;
                return post;
            });
            state.posts=updatedPosts;
        },
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost }=authSlice.actions;
export default authSlice.reducer;