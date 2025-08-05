
import { Expense } from "../models/expense.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const expenseData = asyncHandler(async (req, res) => {

    // 1. find the user . 
    // 2 .if the user exists and user already logged in 
    // 3. take the user id and push it in the data while inserting the data inside the table , 
    // 4. 
    const { goalAmount, income, expenses, date_to, date_from } = req.body;
    if (goalAmount == "") {
        throw new ApiError(400, "goalAmount is missing");
    }
    if (income == "") {
        throw new ApiError(400, "income is missing");
    }
    if (expenses == "") {
        throw new ApiError(400, "expenses is missing");
    }
    if (date_to == "") {
        throw new ApiError(400, "date_to is missing");
    }
    if (date_from == "") {
        throw new ApiError(400, "date_from is missing");
    }
    const userid = req.user._id;
    const expenser = await Expense.create({
        userId: userid,
        goalAmount,
        income,
        expenses,
        date_to,
        date_from,
    }) 

    if(!expenser){
        throw new ApiError(400 , "there where some problem while inserting the data") ;
    }
    else{
        return res.status(200).json( new ApiResponse(200 , "expense data has been successfully inserted")) ;
    }

})

export default expenseData ; 