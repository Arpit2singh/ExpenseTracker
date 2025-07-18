
//generateRefreshAndAccessToken 
//RegisterUser 
//LoginUser 

import { User } from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"; 
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadonCloudinary from "../utils/cloudinary.js";


const generateRefreshAndAcessToken = async(UserId) =>{
    try {
        const user = await User.findById(UserId) ; 
        const refreshToken = user.generateAccessToken() ; 
        const  accessToken = user.generateRefreshToken() ; 
        user.refreshToken = refreshToken ; 
        await user.save({validateBeforeSave : false}) ; 
        return {refreshToken , accessToken} ; 
    } catch (error) {
         throw new ApiError(404 , `refresh and access token is not generated  `) ; 
    }
}

const registerUser = asyncHandler(async(req , res)=>{
    
    //get the details from the frontend  ; 
    //get the info from User.model ; 
    // if find the return exist  ; 
    //else register it  ; 
    //at first check the they have the avatar or not 
    // if it exists add it into the cloudinary ; 
    //create the user object add it in the db  ;
    //then check check created instance if exist 
    //return 
    
    const {username , password ,email , fullname  } = req.body ; 
    console.log(username) ; 
    console.log(password) ; 
    console.log(email) 
    console.log(fullname)

    if (username === "") {
      throw new ApiError(101, "userName is empty ")
   }
   if (email === "") {
      throw new ApiError(101, "email is empty ")
   }
   if (password === "") {
      throw new ApiError(101, "password is empty ")
   }
   if (fullname === "") {
      throw new ApiError(101, "fullName is empty ")
   }

    
    const existedUser = User.findOne({
        $or : [{username} , {email}] 
    })

    if(existedUser){
        throw new ApiError(404, "User exists") ;
    }
    else{
        console.log("User not exists registeration proceeding") ; 

    }

    console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path ; 

    console.log(avatarLocalPath) ; 

    if(!avatarLocalPath){
        throw new ApiError(404 , "Avatar file required LocalPath is missing") ; 
    }

    const avatar = await uploadonCloudinary(avatarLocalPath) ; 
    console.log('hey' , avatar) ; 
     if(!avatar){
   throw new ApiError(400 , "Avatar file is required cloudinary issue") ;
  }

  //usr creation
  const user = await User.create({
    
    username,
    fullname, 
    email , 
    password , 
    avatar : avatar.url ,

  })

  // user checking ; 

  const userSelected = User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!userSelected){
    throw new ApiError(404 , "there is some error while registering") ; 
  }

  return res.status(200).json(new ApiResponse(201 , "user successfully registered"))

})

const LoginUser = asyncHandler(async(req , res)=>{

    //get the detail 
    //username or email check  ; 
    //find the user  ;
    // password check 
    //generate the access and refresh token 
    //send cookie ; 

    const {username ,email , password} = req.body ; 
    console.log(username) 
    console.log(email) 
    console.log(password)
    if(!username && !email){
        throw new ApiError(404 , "username and email not exists")
    }
    
    
    const user = User.findOne({
        $or : [{username} , {email}]
    })

    if(!user){
        throw new ApiError("user not exists") ; 
    }

    const isPasswordValid = await user.isPasswordCorrect(password) ; 

    if(!isPasswordValid){
        throw new ApiError(404, "password is  wrong user not exists") ; 
    }

    const {accessToken , refreshToken} = await generateRefreshAndAcessToken(user._id) ; 
    const LoggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
   
    const options = {
        httpOnly : true  , 
        secure : true 
    }

    return res.status(201).cookie("refreshToken" , refreshToken , options).cookie("accessToken" , accessToken , options).json(
        new ApiResponse(201 ,{
            user : accessToken , refreshToken , LoggedInUser ,
        }  , "user Login Successfully")
    )

})