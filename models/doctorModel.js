const mongoose = require ("mongoose");

const doctorSchema = new mongoose.Schema({
    name: { type: String, required :true } ,
   
});


const doctorModel = mongoose.model("Doctor" , doctorSchema );
module.exports = doctorModel