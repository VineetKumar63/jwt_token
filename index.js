const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey="secretKey";
///////////////////////////////////// 
app.get ("/get",(req,res)=>{
    res.json({
        message: " its api"
    })
}) 
//////////////////////////////////////
app.post ("/login",(req,resp)=>{
    const user ={
        id : 1234,
        username: "harryPotter",
        email : "harry@potter.com"
    }
    jwt.sign({user},secretKey,{expiresIn:'1200s'},(err,token)=>{
        resp.json({
            token
        })
    })

})

////////////////////
app.post('/profile',verifyToken,(req,res)=>{
    jwt.verify(res.token,secretKey,(err,authData)=>{
        if (err){
            res.send({result:"invalid token"})
        }else{
            res.json({
                  message:"profile accesed",
                  authData
            })
              
        }
    })

})

///////////////////////////
function verifyToken(req,res,next){
const bearerHeader = req.headers['authorization'];
if(typeof bearerHeader !== undefined){
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    res.token = token ;
    next();
} else {
    res.send({
        result:"token invalid"
    })
}
}
///////////////////////////
app.listen(5000,()=>{
    console.log("app is running");
})