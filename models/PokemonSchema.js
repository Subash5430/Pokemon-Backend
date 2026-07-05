const mongoose=require('mongoose')

const Pokemon = mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    type:[
        {
            type:String
        }
    ],

    height:{type:String},

    weight:{type:String},

    abilities:[
        {
            type:String
        }
    ],

    stats:{
        hp:Number,
        attack:Number,
        defense:Number,
        speed:Number
    },

    image:{type:String}
})

module.exports=mongoose.model('Pokemon',Pokemon)