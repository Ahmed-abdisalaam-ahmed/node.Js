import express from 'express'
import userRoutes from './routes/users.js'
import postsRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import uploadRoutes from './routes/upload.js'
import dotenv from 'dotenv' 
const app = express();

dotenv.config()

import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { logger } from './middlewares/logger.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT =  process.env.PORT || 5000

// GET 
// POST
// PUT
// DELETE

// Simple in-memory data
// let users = [
//   { id: 1, name: 'Ayaan' },
//   { id: 2, name: 'Fatima' },
//   { id: 3, name: 'Zubeyr' }
// ];

// middleware
app.use(express.json())

app.use(cors(
    {
        origin: ["dugsiiye.com", "shihabi.com"]
    }
))
app.use(morgan('dev'))

// custom middleware
app.use(logger)

// routers midleware

app.use('/users', userRoutes);
app.use('/posts', postsRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes)
app.use('/upload', uploadRoutes)

// Read 
app.get('/', (req, res) => {
    res.json("Api is Running....")
})

// Error middleware halak danbe gali si anu cilad u noqon
app.use(notFound)
app.use(errorHandler)

// connect mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(()=> 
        console.log("✅ mongoDb connected locally"), 
        app.listen(PORT, () => {
        console.log(`🚀 Server is Running on Port http//localhost:${PORT}`)
    }))
    .catch((err)=> console.log("❌ connection err:",err))