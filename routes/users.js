const express = require('express')
const router = express.Router();
const { getUsers, getUserInfo, createUser, updateUser, deleteUser} = require('../controllers/users')

router.get('/', getUsers)
router.get('/:id', getUserInfo)
router.post('/create', createUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)


// export the router dat
module.exports = router