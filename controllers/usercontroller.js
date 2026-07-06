const User=require('../models/User')
const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

exports.register=async(req,res)=>{
    try{
        const userexists=await User.findOne({mail:req.body.mail})
        if(userexists){
            return res.status(400).json({
                message:"User already exists"
            })
        }
        const hashed=await bcrypt.hash(req.body.password,10)
        const data=await User.create({
            name:req.body.name,
            mail:req.body.mail,
            password:hashed,
            number:req.body.number
        })
        res.status(200).json({
            message:"Registered successfully",
            data
        })
    }catch(err){
        res.status(400).json({
            messsage:err.message,
            err
        })
    }
}

exports.login=async(req,res)=>{
    try{
        const existinguser=await User.findOne({
            mail:req.body.mail
        }) 
        if(!existinguser){
            return res.status(400).json({
                message:"Register First"
            })
        }
        const decrypt=await bcrypt.compare(req.body.password,existinguser.password)
        if(!decrypt){
            return res.status(400).json({
                message:"Password doesn't match"
            })
        }
        token=jwt.sign(
        {
            id:existinguser._id
        },process.env.API_SECRET,{
            expiresIn:'2d'
        })

        res.status(201).json({
            message:"login successful",
            token
        })
    }catch(err){
        res.status(401).json({
            message:err.message,
            err
        })
    }
}