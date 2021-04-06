
const jwt = require('jsonwebtoken');
const config = require("../config");



function auth(req, res, next){
    try{
        const token = req.cookies.token
        console.log("TOKEN :" , token)
        console.log("secret :" ,config.ACCESS_TOKEN_SECRET)
        if(!token || token == undefined){
            return res.status(401).json({msg:"unauthorized"})
        }

        const verified = jwt.verify(token ,config.ACCESS_TOKEN_SECRET)
       console.log("verified :" ,verified )
        req.user= verified.user
        
       console.log( "AUTH" ,  req.user);
       console.log("TOKEN :" , token);
        next();

    }catch(error){
        console.error(error)
        res.status(401).json({msg:"Unauthorized"})
    }
};

module.exports = auth;