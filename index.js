import express from 'express'
import userRoutes from './routes/users.js'
import userPosts from './routes/posts.js'
import dotenv from 'dotenv'
const app = express();

dotenv.config()

import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'

const PORT =  process.env.PORT || 5000

// GET 
// POST
// PUT
// DELETE

// Simple in-memory data
let users = [
  { id: 1, name: 'Ayaan' },
  { id: 2, name: 'Fatima' },
  { id: 3, name: 'Zubeyr' }
];

// middleware
app.use(express.json())

app.use(cors(
    {
        origin: ["dugsiiye.com", "shihabi.com"]
    }
))
app.use(morgan('combined'))

// routers midleware

app.use('/users', userRoutes);
app.use('/posts', userPosts);

// Read 
app.get('/', (req,res) => {
    res.json(users)
})

// connect mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("✅ mongoDb connected locally"))
    .catch((err)=> console.log("❌ connection err:",err))


app.listen(PORT, () => {
    console.log(`Server is Running on http//localhost:${PORT}`)
})