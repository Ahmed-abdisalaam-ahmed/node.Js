const express = require('express');
const userRoutes = require('./routes/users')
const userPosts = require('./routes/Posts')
const app = express();
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const PORT =  process.env.PORT || 3000

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