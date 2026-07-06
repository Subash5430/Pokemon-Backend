const mongoose=require('mongoose')

const FormData=mongoose.Schema({
    name:{
        type:String
    },
    number:{
        type:String
    },
    email:{
        type:String
    },
    dob:{
        type:String
    }
})