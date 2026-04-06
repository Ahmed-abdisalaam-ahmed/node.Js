import express from 'express'
import { login, register } from '../controllers/auth.js'
import { protect } from '../middlewares/auth.js'
import { validate } from '../middlewares/validateZod.js'
import { createUserschema } from '../Schemas/userSchema.js'
const router = express.Router()

router.post('/register', validate(createUserschema),register)
router.get('/login', login)

// Protected Routes

router.get('/protect', protect, (req, res) => {
    console.log("req.user", req.user)
    res.json(req.user)
})

export default router