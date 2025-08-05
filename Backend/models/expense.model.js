

import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({

    userId :{
        type : String , 
        required : true  ,
    },
    
    date_from :{
        type : Date , 
        required : true , 

    } , 
     date_to :{
        type : Date , 
        required : true , 

    } , 

 expenses: [
    {
      title: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    }
  ],

    
    income :{
        type : Number , 
        required : true , 

    },
     goalAmount :{
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