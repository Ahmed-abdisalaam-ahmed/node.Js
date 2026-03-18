const express = require('express');
const { getPosts, getPostsInfo } = require('../controllers/posts');
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostsInfo);

// export the router 
module.exports = router