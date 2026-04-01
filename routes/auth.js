import express from 'express'
import { login, register } from '../controllers/auth.js'
import { protect } from '../middlewares/auth.js'
const router = express.Router()

router.post('/register', register)
router.get('/login', login)

// Protected Routes

router.get('/protect', protect, (req, res) => {
    console.log("req.user", req.user)
    res.json(req.user)
})

export default router