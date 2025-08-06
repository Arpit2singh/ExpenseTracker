import { Expense } from "../models/expense.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const editExpense = asyncHandler(async (req, res) => {
    const {oldTitle, title, amount} = req.body ; 
    const user = req.user._id;

    if (!user) {
        throw new ApiError(400, "user not found while eediting  the expense data");
    }
    else {
        console.log("user found while editing the expense data");
    }
    const UpdatedExpenseDataSchema = await Expense.findOneAndUpdate({ userId: user ,
         "expenses.title": oldTitle 
    }, {

        
        $set: {
                 "expenses.$.title" : title , 
                 "expenses.$.amount": amount , 
        }
    },
        {
            new: true

        },
    );

    const options = {
        httpOnly: true,
        secure: true,
    }

    if(!UpdatedExpenseDataSchema){
        throw new ApiError(404 , "Expense Itme title and amount not been updated") ;
    }
    res.status(200).json(new ApiResponse(200 , UpdatedExpenseDataSchema , "data has been updated Successfully")) ; 

})


export default editExpense  ; 