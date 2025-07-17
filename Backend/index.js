import dotenv from "dotenv" 
dotenv.config({
    path : '.env'
}) 
import app from "./app.js";
import express from "express"  

import dbLogic from "./db/db.connection.js"; 




// app.get("/" , (req ,res)=>{
//     res.send("hey all working fine ") ; 
// })



dbLogic().then(app.listen(process.env.PORT , ()=>{
    console.log(`server is listening on the port ${process.env.PORT}` ) ; 
        console.log(`db is connected at the port http://localhost:${process.env.PORT}`) 
    
}) ).catch((error)=>{
    console.log(error) ; 
}) ; 