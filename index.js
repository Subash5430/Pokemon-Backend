require("dotenv").config();
const express=require('express')
const mongoose=require('mongoose')
const app=express()
const db=require('./config/db')
const dns = require("node:dns/promises")
const pokerouter=require('./routes/pokemonrouter')
const userrouter=require('./routes/userroute')
const formrouter=require('./routes/formrouter')


dns.setServers(["8.8.8.8","1.1.1.1"])
app.use(express.json())
db()
app.use('/',userrouter)
app.get('/',(req,res)=>{
    res.send("server is running")
})

app.use('/',pokerouter)
app.use('/',formrouter)

app.listen(3000,()=>{
    console.log('Server is running')
})