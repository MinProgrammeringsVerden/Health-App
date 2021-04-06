const mongoose = require ("mongoose");
const Schema = mongoose.Schema;


const appointmentSchema = new mongoose.Schema({
    name: { type: String, required :true } ,
    date: { type: Date , required :true } ,
    time: { type: Date , required :true } ,
    userId: {type: Schema.Types.ObjectId, ref: 'User'  ,required :true  }
   
} ,{   timestamps :true  });


const appointmentModel = mongoose.model("Appointment" , appointmentSchema );
module.exports = appointmentModel