
import asyncHandler from "../utils/asyncHandler.js";
import { Expense } from "../models/expense.model.js";
import { User } from "../models/user.model.js"; 
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


const getExpenseData = asyncHandler(async (req , res)=>{
    const user = req.user._id ; 
    if(!user){
        throw new ApiError(400 , "user not found while fetching the expense data") ; 
    }
    else{
        console.log("user found while fetching the expense data") ; 
    }
  
    const userExpense = await Expense.find({userId: user}).sort({date_from : -1}) ;
    if(!userExpense || userExpense.length === 0 ){
        throw new ApiError(400 , "user expense not found while fetching the expense data") ; 
    }
    else{
        console.log("user data found while fetching the expense data") ; 
    }
    console.log(userExpense) ; 

    // after getting the user data ; 
    //now apply the filter from date to which date you have to put according to the schema 

//         date_from :{
//         type : Date , 
//         required : true , 

//     } , 
//      date_to :{
//         type : Date , 
//         required : true , 

//     } , 

//  expenses: [
//     {
//       title: {
//         type: String,
//         required: true,
//       },
//       amount: {
//         type: Number,
//         required: true,
//       },
//     }
//   ],


// fetched the data inside the variable  
// then use for in loop traverse it add all the expense into the sum   ; 


// hey chat gpt do i write the functionality of sum > desired amount -> light up the red flag .. ?? 
// this redflag is the object inside the model so which model  ?? expense or user  ?? do this help me to check the 
// weather i am moving to the desired result or not  ?? and then if not i can easily showcase pop up on frontend 



// 3rd step Add flag if expense > set- desired amount  ; 

const enrichedData = userExpense.map((doc)=>{
    const totalAmountSpent = doc.expenses.reduce((sum , item)=> sum + item.amount , 0 ) ;
  const isOverBudget = totalAmountSpent > doc.goalAmount;

return {
  _id: doc._id,
  date_from: doc.date_from,
  date_to: doc.date_to,
  income: doc.income,
  goalAmount: doc.goalAmount,
  totalAmountSpent,
  isOverBudget,
  expenses: doc.expenses,
};

})
return res.status(200).json(new ApiResponse(200 ,enrichedData, "All expenses fetched")) ; 

})

export default getExpenseData ; 



