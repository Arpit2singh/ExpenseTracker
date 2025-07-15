import express from "express"  
import dotenv from "dotenv" 
import dbLogic from "./db/db.connection.js"; 
dotenv.config({
    path : '.env'
})

const app = express() ; 

app.get("/" , (req ,res)=>{
    res.send("hey all working fine ") ; 
})

app.listen(process.env.HOST , ()=>{
    console.log(`server is listening on the port ${process.env.HOST}`)
}) 

dbLogic() ; 