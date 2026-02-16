const express = require('express');
const app = express();


app.get('/', (req, res)=> {
    res.send("heloo world Node.js Express");
})
app.get('/ahmed', (req, res)=> {
    res.send("heloo world ahmed Node.js Express");
})
app.get('/admin', (req, res)=> {
    res.send("heloo world admin Node.js Express");
})

app.listen(3000, ()=>{
    console.log('this helo page')
})



