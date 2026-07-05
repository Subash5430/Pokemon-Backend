const mongoose=require('mongoose')

const User=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    number:{
        type:String
    }
})

module.exports=mongoose.model('User',User)