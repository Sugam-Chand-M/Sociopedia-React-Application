import express from 'express';
import {getFeedPosts,getUserPosts,likePost} from "../controllers/posts.js";
import { verifyToken } from '../middleware/auth.js';

const router=express.Router();

// Read operation in CRUD operations
router.get("/",verifyToken,getFeedPosts);
router.get("/:userId/posts",verifyToken,getUserPosts); // userId is used to grab the relevant users posts

// Update operation in CRUD operations
router.patch("/:id/like",verifyToken,likePost); // used for liking or unliking the post
export default router;