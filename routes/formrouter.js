const express=require('express')
const router=express.Router()
const {sendemail}=require('../controllers/formcontroller')

router.post('/submit',sendemail)

module.exports=router