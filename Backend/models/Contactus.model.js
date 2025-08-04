
import mongoose from "mongoose" ; 

const ContactSchema = new mongoose.Schema({
    fullname :{
        type : String , 
        required : true ,
    },
    email :{
        type : String , 
        required : true ,
    },
    phoneNumber :{
        type : String , 
        required : true ,
    }, 
    Query :{
        type : String , 
        required : true ,
    }
}, {timestamps : true }) ; 

export const Contact = mongoose.model("Contact" , ContactSchema) ; 