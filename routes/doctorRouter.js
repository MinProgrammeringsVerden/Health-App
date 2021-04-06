const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const auth = require("../middelware/auth");



router.get('/' , async (req , res) =>{
   try{
        const doctors = await Doctor.find();
        if(!doctors) return res.status(400).json({msg:"there was not data"})
        res.send(doctors)

   }catch(error){
        res.status(500).json({error})
   }


});


router.post('/' , auth , async (req , res) =>{
   try{
      const {name} = req.body
      const newDoctor = await new Doctor({name})
      const saveDoctor = await newDoctor.save()
      if(!saveDoctor)return res.status(400).json({msg:"saveing new doctor failed"})
      res.status(200).send(saveDoctor)

    }catch(error){
      res.status(500).json({error})
    }
 
 
 });








module.exports = router