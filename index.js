const express = require('express');
const connectToMongo = require('./db')
const cors = require('cors')
const app = express();
const port = 5000;
connectToMongo();
app.use(cors())

app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/admin',require('./routes/admin'));
app.use('/api/doctor',require('./routes/doctor'))

app.listen(port,()=>{
    console.log(`example app is listening at http://localhost:${port} `)
})