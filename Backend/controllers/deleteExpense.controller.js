import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Expense } from "../models/expense.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const deleteExpense = asyncHandler(async(req , res) =>{
    const user = req.user._id ; 
    const {title} = req.body ; 
    if(!user){
        throw new ApiError(404 , "User not found" ) ; 
    }
    if(!deleteExpense){
        throw new ApiError(404 , "expense data not found from frontend") ; 
    }
    
  const deleteExpenseData = await Expense.findOneAndUpdate({userId : user },
        {
                  $pull :{
                    expenses : {title : title}
                  }
        } ,
        {
            new : true  
        } ,
    ) 

    const options = {
        httpOnly : true , 
        secure : true , 
    }
  
    if(!deleteExpenseData){
        throw new ApiError(401 , "deletion not possible") ;
     }
    res.status(200).json( new ApiResponse(200 , "deletion successfully")) ; 

}) 

export default deleteExpense ; 