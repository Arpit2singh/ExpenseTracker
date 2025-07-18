

import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    
    date :{
        type : Number , 
        required : true , 

    } , 

    savings :{
        type : Number , 
        required : true , 

    }, 
    
    expenses :{
        type : Number , 
        required : true , 

    } , 
    
    income :{
        type : Number , 
        required : true , 

    },
     goal :{
        type : Number , 
        required : true , 

    },
    refreshToken : {
        type : String ,
    },

    accessToken :{
        type : String ,
    }
  
},{timestamps:true}) 

export const Expense = mongoose.model("Expense" , expenseSchema) ; 