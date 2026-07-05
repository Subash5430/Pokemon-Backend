const express=require('express')
const Pokemon=require('../models/PokemonSchema')

exports.addPokemon=async (req,res)=>{
    try{
        if(!req.body.name){
            return res.status(400).json({
                message:"enter name for pokemon"
            })
        }
        if(req.body.height<=0){
            return res.status(400).json({
                message:"height must be postive and greater than 0"
            })
        }
        if(req.body.weight<=0){
            return res.status(400).json({
                message:"weight must be postive and greater than 0"
            })
        }
        if(!Array.isArray(req.body.type)){
            return res.status(400).json({
                message:"Type must be an array"
            })
        }
        if(typeof req.body.stats !== "object"){
            return res.status(400).json({
                message:"stats must be an array"
            })
        }
    const data = await Pokemon.create(req.body)
    res.status(201).json({
        message:"Pokemon added Successfully",
        data:data
    })
    }
    catch(err){
        res.status(401).json({
            err
        })
    }
}

exports.getpokeall=async (req,res)=>{
    try{
    const data = await Pokemon.find()
    res.status(201).json({
        message:"Pokemons",
        data:data
    })
    }
    catch(err){
        res.status(401).json({
            err
        })
    }
}

exports.getpokebyid=async(req,res)=>{
    try{
        const data=await Pokemon.findById(req.params.id)
        res.status(200).json({
            message:"fetched successfully",
            data
        })

    }catch(err){
        res.status(401).json({
            message:"enter correct pokemon name",
            err
        })
    }
}

exports.getpokebyname=async(req,res)=>{
    try{
        const data=await Pokemon.findOne({name:req.params.name})
        res.status(200).json({
            message:"Fetched Successfully",
            data
        })

    }catch(err){
        res.status(401).json({
            message:"enter correct name",
            err
        })
    }
}

exports.updatepoke=async(req,res)=>{
    try{
        if(!req.body.name){
            return res.status(400).json({
                message:"enter name for pokemon"
            })
        }
        if(req.body.height<=0){
            return res.status(400).json({
                message:"height must be postive and greater than 0"
            })
        }
        if(req.body.weight<=0){
            return res.status(400).json({
                message:"weight must be postive and greater than 0"
            })
        }
        if(!Array.isArray(req.body.type)){
            return res.status(400).json({
                message:"Type must be an array"
            })
        }
        if(typeof req.body.stats !== "object"){
            return res.status(400).json({
                message:"stats must be an array"
            })
        }
        const data=await Pokemon.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runvalidators:true
        })
        res.status(200).json({
            message:"Updated Successfully",
            data
        })

    }catch(err){
        res.status(401).json({
            message:"enter correct id",
            err
        })
    }
}

exports.deletepoke=async(req,res)=>{
    try{
        const data=await Pokemon.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"Deleted Successfully",
            data
        })

    }catch(err){
        res.status(401).json({
            message:"enter correct id",
            err
        })
    }
}

exports.searchbyname=async(req,res)=>{
    try{
        const data=await Pokemon.find({
            name:{
                $regex:req.query.name,
                $options:'i'
            }
        })
        res.status(200).json({
            data
        })
    }catch(err){
        res.status(400).json({
            err
        })
    }
}

exports.filterbytype=async(req,res)=>{
    try{
        const filter={}
        if(req.query.type){
            filter.type = req.query.type
        }
        const data= await Pokemon.find(filter)
        res.status(200).json({
            data
        })
    }catch(err){
        res.status(400).json({
            err
        })
    }
}

exports.sortresults=async(req,res)=>{
    try{
        const data= await Pokemon.find().sort(req.query.sort)
        res.status(200).json({
            message:"Results Sorted Successfully",
            data
        })
    }
    catch(err){
        res.status(400).json({
            err
        })
    }
}

exports.pagination = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        if (page < 1) page = 1;
        if (limit > 100) limit = 10;

        const skip = (page - 1) * limit;

        const data = await Pokemon.find()
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            message: "Pagination successful",
            page,
            limit,
            data
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};