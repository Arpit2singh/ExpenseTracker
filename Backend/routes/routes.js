import express from "express"  

const app = express() ; 

app.get("/" , (req ,res)=>{
    res.send("hey all working fine ") ; 
})

app.listen(process.env.HOST , ()=>{
    console.log(`server is listening on the port ${process.env.HOST}`)
})