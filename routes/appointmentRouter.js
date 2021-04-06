const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const auth = require("../middelware/auth");
const mongodb =require("mongodb");

const ObjectId = mongodb.ObjectId




router.post('/' ,auth ,  async (req , res) => {
    try{
     
        console.log("appointmensRouter" , req.user)
        
        const { name}= req.body;
        const { date}= req.body;
        const { time}= req.body;
        const userId =req.user
        const newAppointment= new Appointment({name , date  , time , userId })
        const newAppointmentSaved = await newAppointment.save();
        console.log('userId' , userId);

        if(!newAppointmentSaved){
            return res.status(400).send("appointment not created")
         }
         User.findByIdAndUpdate(userId,
            {$push: {appointments:newAppointmentSaved._id}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err){
                console.log(err);
                }else{
                console.log('new appointmentid has been added to the appointments array' ,  req.user)
                }})
        // console.log('userId' , userId);
         //console.log('appointments' , appointments);
        
        res.status(200).send(newAppointmentSaved )

    }
    catch(error){
         console.error(error);
        res.status(500).send(" error server");

    };
 })





    router.delete('/:id' , auth ,  async (req , res) => {
        try{
            const userId = req.user.id;
            const id = req.params.id;
            console.log('userId' , userId);
            console.log('Id' , id);
             const deletedAppId = await Appointment.findByIdAndDelete(id)
             console.log(deletedAppId)

             if(!deletedAppId ){ return  res.status(400).send('deleted appointment feiled' )}
             
            
            res.status(200).send( deletedAppId  )
    
        }
        catch(error){
             console.error(error);
            res.status(500).send(" error server");
    
        }

       });



 router.get('/' , auth ,   async(req , res) => {
     
      
    try{
        const id = req.user
        
        //console.log('this is the USERID' , userId , typeof(userId))
         const appointments = await Appointment.find()
         console.log('appointments' ,appointments);
         console.log('id' ,id)
  
            
         

         if(!appointments) return res.status(400).json({msg:"error under catching the appointments"})

         const userAppointments = appointments.find({userId :id})
          console.log("====== apointmentValue: " + userId + ", req.user:" + req.user + ", userId typeof: "+ typeof(userId)+", req.user: "+ typeof(req.user));
         

          if(!userAppointments) return res.status(400).json({msg:"error under catching the userAppointments"})
          console.log('userAppointments' , userAppointments)
        
        
        res.status(200).send(appointments)

    }
    catch(error){
         console.error(error);
        res.status(500).send(" error server");

    }
 });






module.exports = router 