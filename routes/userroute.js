const {register,login}=require('../controllers/usercontroller')
const express=require('express')
const router=express.Router()

router.post('/auth/user',register)

router.post('/login',login)

module.exports=router