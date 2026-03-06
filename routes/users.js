const express = require('express')
const router = express.Router();
const { getUsers, getUserInfo, createUser, updateUser } = require('../controllers/users')

router.get('/', getUsers)
router.get('/:id', getUserInfo)
router.post('/create', createUser)
router.put('/update', updateUser)

// export the router 
module.exports = router