import express from 'express';
import { getPosts, getPostsInfo } from '../controllers/posts.js';
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostsInfo);

// export the router 

export default router