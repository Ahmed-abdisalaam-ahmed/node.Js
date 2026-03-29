import express from 'express'
import { login, register } from '../controllers/auth.js'
import { protect } from '../middlewares/auth.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)

// Protected Routes

router.get('/protect', protect, (req, res) => {
    res.json("Protected route")
})

export default router