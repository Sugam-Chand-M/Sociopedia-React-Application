import { PersonAddOutlined,PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./flexBetween";
import UserImage from "./userImage";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const Friend=({friendId,name,subtitle,userPicturePath})=>{
    const { palette }=useTheme();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {_id}=useSelector((state)=>state.user);
    const token=useSelector((state)=>state.token);
    const friends=useSelector((state)=>state.user.friends);
    const primaryLight=palette.primary.light;
    const primaryDark=palette.primary.dark;
    const main=palette.neutral.main;
    const medium=palette.neutral.medium;

    const isFriend=friends.find((friend)=>friend._id===friendId);

    const patchFriend=async()=>{ // an api call to add or remove a friend
        const response=await fetch(
            `http://localhost:3001/users/${_id}/${friendId}`,
            {
                method:"PATCH",
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                }
            }
        );
        const data=await response.json();
        dispatch(setFriends({friends:data}));
    };

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                onClick={()=>{
                    navigate(`/profile/${friendId}`); // bug - when we go to a certain profile page and then try to go to a certain profile page the url does update with the react router but the components does not render
                    navigate(0); // a not so recommended workaround for the above bug - it will go to the next users page and then refresh the page
                }}
                >
                    <Typography
                    color={main}
                    variant="h5"
                    fontWeight="500"
                    sx={{
                        "&:hover":{
                            color:palette.primary.light,
                            cursor:"pointer"
                        }
                    }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {/* Friend Removal Button */}
            <IconButton
            onClick={()=>patchFriend()}
            sx={{backgroundColor:primaryLight,p:"0.6rem"}}
            >
                {isFriend?(
                    <PersonRemoveOutlined sx={{color:primaryDark}}/>
                ):(
                    <PersonAddOutlined sx={{color:primaryDark}}/>
                )}
            </IconButton>
        </FlexBetween>
    );
};

export default Friend;