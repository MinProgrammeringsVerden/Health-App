const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({

    name: { type: String, required :true } ,
    surname: { type: String, required :true } ,
    personalnum: { type: String, required :true  , unique :true} ,
    mobile: { type: String, required :true } ,
    email: { type: String, required :true , unique :true , dropDups :true} , 
    password: { type: String, required :true }  , 
    passwordCheck: { type: String, required :true } ,
    appointments:[{
        type: Schema.Types.ObjectId, ref: 'Appointment'
      
      }],
       
        
    

});


const userModel = mongoose.model("User" , userSchema );
module.exports = userModel
