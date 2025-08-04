import userRoutes  from "./routes/routes.js";
import express from "express" ;
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express() ; 

app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({extended:true , limit :"40kb"}))
app.use(cors({
origin : process.env.CORS , 
credentials  : true ,
}))
app.use(cookieParser());

app.use("/api/v1/users" , userRoutes )

app.listen(process.env.PORT , (req,res)=>{
  console.log(`server is running on the port ${process.env.PORT}`);

}) 

export default app ; 