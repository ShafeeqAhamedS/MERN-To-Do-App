require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3500;

const routerPage = require('./route/todolistroute')

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
app.use(cors())
db.on('error',(errormessage)=>console.log(errormessage))
db.once('open',()=>console.log('Connection Established'))
app.use(express.json())


app.get('/',(req,res)=>{
  res.send("Server Working")
})

app.use('/api/v1/list',routerPage)
app.listen(PORT,()=>console.log(`listening at http://localhost:${PORT}`))