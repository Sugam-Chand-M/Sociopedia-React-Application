import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from '../middleware/auth.js';

const router=express.Router();

// Read operation in CRUD operations
router.get("/:id",verifyToken,getUser); // :id indicates if the frontend is using a particular user id we can grab that id and call the database with that particular id
router.get("/:id/friends",verifyToken,getUserFriends); // grab the user friends

// Update operation in CRUD operations
router.patch("/:id/:friendId",verifyToken,addRemoveFriend); // used for adding or removing a friend
export default router;