const express=require('express')
const router=express.Router()
const {sendbulkmails}=require('../controllers/bulkemails')

router.post('/send/bulk',sendbulkmails)

module.exports=router