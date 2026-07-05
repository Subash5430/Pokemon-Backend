const {addPokemon,getpokeall,getpokebyid,getpokebyname,updatepoke,deletepoke,searchbyname,filterbytype,sortresults,pagination}=require('../controllers/pokemoncontrollers')
const express=require('express')
const router=express.Router()
const auth=require('../middlewares/authmiddleware')

router.post('/pokemon/add',auth,addPokemon)

router.get('/pokemons',getpokeall)

router.get('/pokemon/pagination',pagination)

router.get('/pokemon/filter',filterbytype)

router.get('/pokemon/search',searchbyname)

router.get('/pokemon/sort',sortresults)

router.get('/pokemon/:id',getpokebyid)

router.get('/pokemon/name/:name',getpokebyname)

router.put('/pokemon/:id',auth,updatepoke)

router.delete('/pokemon/:id',auth,deletepoke)

module.exports=router