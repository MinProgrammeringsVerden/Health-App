const express = require ("express");
const mongoose = require ("mongoose");
const morgan = require ("morgan");
const cors = require ("cors");
const dotenv =require("dotenv");
const userRouter = require("./routes/userRouter");
const doctorRouter = require("./routes/doctorRouter");
const appointmentRouter = require("./routes/appointmentRouter");
const config =require("./config");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();


const PORT = process.env.PORT || 5000
const mongodb = config.MONGODB_URL 

app.listen(PORT , () => console.log(`App listen at port ${PORT}`));


app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"] , 
    credentials:true,
}));


app.use(morgan("dev"));




mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true ,  useCreateIndex :true } ,console.log('connected to MangoDb')).catch((error) => console.log({error}));
mongoose.connection.on('connected' , () => { console.log('mongoose is connected !!!!!')});

app.use("/users" ,  userRouter);
app.use("/appointments" ,  appointmentRouter);
app.use("/doctors" , doctorRouter);




