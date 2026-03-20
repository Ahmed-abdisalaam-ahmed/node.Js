import express from 'express';
import { getUsers, getUserInfo, createUser, updateUser, deleteUser} from '../controllers/users.js'
const router = express.Router();

router.get('/', getUsers)
router.get('/:id', getUserInfo)
router.post('/create', createUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)


// export the router dat
export default router