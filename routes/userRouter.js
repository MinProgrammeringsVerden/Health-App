const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const auth = require("../middelware/auth");



router.post('/signup' , async(req , res) => {
    try{

        const {name , surname , personalnum, mobile , email , password , passwordCheck}= req.body;

        if (!name || !surname || !personalnum || !mobile || !email || !password || !passwordCheck){
            return res.status(400).json({msg:"All fields are required"})
        };
   
        if (password.length < 7){
            return res.status(400).json({msg:"The password has to be at least 7 characters long"})
        };
   
   
        if ( password !== passwordCheck){
           return res.status(400).json({msg:" Enter the password twice for the verification"})
        };
   
        const allreadyExistingEmail= await User.findOne({email})
         if (allreadyExistingEmail) {
              return res.status(400).json({msg:" An account with that email allready exist"})
           };
         
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password , salt);
        


        const user= new User({ name , surname , personalnum, mobile , email , password:hashedPassword, passwordCheck: hashedPassword })
        const newUser = await user.save();
       

        const hash = newUser._id
        const secret= config.ACCESS_TOKEN_SECRET;
        const accesToken = jwt.sign({hash }, secret )
        
                        

        res.cookie("token" , accesToken , {
            httpOnly:true ,
                secure: true , 
                sameSite:"none" }).json({msg:"token created"})
            .send( )


       
       
    }
    catch(error){

        res.status(500).json(error)

    };
 

   
});



router.post('/signin' , async(req , res) =>{
 
 try{
     const {email , password } = req.body
      if ( !email || !password ){
        return res.status(400).json({msg:"All fields are required"})};
    
     
      const existingUser= await User.findOne({email})

        if (!existingUser) {
           return res.status(400).json({msg:" User with such a account doesnt exist"})
        }; 
         console.log(existingUser)
    

      const veryfied = await bcrypt.compare(password , existingUser.password )
         if(!veryfied){
             return res.status(401).json({msg:"Uncorrect email or  password"})
         };
         console.log("verified" , veryfied);
         console.log("existingUser" , {existingUser});
         const user = existingUser._id
         const secret= config.ACCESS_TOKEN_SECRET;
         const token = jwt.sign({user }, secret )

        

         
                         

        res.cookie("token" , token , {
            httpOnly:true , 
            maxAge: 900000,
            secure: true , 
            sameSite:"none" }).json({msg:"you are logged in"})     
         .status(200).send()
       
        

       
    } catch(error){
        res.status(500).json(error)
    }


});


router.get('/:id' , auth , async (req , res) => {
    try{
        const id = req.user
        console.log("id :" , id)

       
        const user = await User.findById(id).populate({
            path: 'appointments',
            model: 'Appointment'
        })
       .exec(function (err, user) {
         if (err){
           console.log(err);
         } else {
           res.status(200).send(user);
           console.log('userrrrrrrrrrrrrrrrrrrr'  ,user );
         }
       });
     }catch(error){

        res.status(500).json(error)

    };
 

   
});

router.get('/' , auth , async (req , res) => { 
       const id = req.user
    try{
          
       const user = await User.find();
    
      if (!user) {
        return res.json({msg:"users dont find"})
 
    }
        
      res.send(user)
 
     

    }
    catch(error){

        res.status(500).json(error)

    };

});    






router.get('/loggout' ,(req , res) => {
    console.log(req.cookies)
    res.cookie("token" , "" , {
     httpOnly:true ,
     expires:new Date(0),
     secure:true,
     someSite:"none"
  }).json({msg:"You are logged out"})

});


module.exports = router

