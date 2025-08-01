
//generateRefreshAndAccessToken 
//RegisterUser 
//LoginUser 

import { User } from "../models/user.model.js"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadonCloudinary from "../utils/cloudinary.js"; 
import path from "path" ; 
import { log  } from "console"; 
import  jwt  from "jsonwebtoken";


const generateRefreshAndAcessToken = async (UserId) => {
    try {
        const user = await User.findById(UserId);
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { refreshToken, accessToken };
    } catch (error) {
        throw new ApiError(404, `refresh and access token is not generated  `);
    }
}

const registerUser = asyncHandler(async (req, res) => {

    //get the details from the frontend  ; 
    //get the info from User.model ; 
    // if find the return exist  ; 
    //else register it  ; 
    //at first check the they have the avatar or not 
    // if it exists add it into the cloudinary ; 
    //create the user object add it in the db  ;
    //then check check created instance if exist 
    //return 

    const { username, password, email, fullname } = req.body;
    console.log(username);
    console.log(password);
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


    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(404, "User exists");
    }
    else {
        console.log("User not exists registeration proceeding");

    }


    console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;

    console.log(avatarLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(404, "Avatar file required LocalPath is missing");
    }

    const avatar = await uploadonCloudinary(avatarLocalPath);


    if (!avatar) {
        throw new ApiError(400, "Avatar file is required cloudinary issue");
    }

     console.log(username);
    console.log(password);
    console.log(email)
    console.log(fullname)


    //usr creation
    const user = await User.create({

        username,
        fullname,
        email,
        password,
        avatar: avatar.url,

    })

    
    console.log(password);

    console.log(user);
    // user checking ; 

    const userSelected = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!userSelected) {
        throw new ApiError(404, "there is some error while registering");
    }

    return res.status(200).json(new ApiResponse(201, "user successfully registered"))

})

const LoginUser = asyncHandler(async (req, res) => {

    //get the detail 
    //username or email check  ; 
    //find the user  ;
    // password check 
    //generate the access and refresh token 
    //send cookie ; 

    const { username, email, password } = req.body;
    console.log(username)
    console.log(email)
    console.log(password)
    if (!username && !email) {
        throw new ApiError(404, "username and email not exists")
    }


    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError("user not exists");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(404, "password is  wrong user not exists");
    }

    const { accessToken, refreshToken } = await generateRefreshAndAcessToken(user._id);
    const LoggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(201).cookie("refreshToken", refreshToken, options).cookie("accessToken", accessToken, options).json(
        new ApiResponse(201, {
            user: accessToken, refreshToken, LoggedInUser,
        }, "user Login Successfully")
    )

})

const LogoutUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.body._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        });

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
        new ApiResponse(200, {}, "user logged out successfully")

    )
})

// refreshing the access token by then help of access token 

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(404, "Unauthorized user detected , refreshToken ")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(404, "invalid refresh token ")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(404, "refresh token expired or used ")
        }

        const options = {
            httpOnly: true,
            secure: true,
        }

        const { accessToken, newRefreshToken } = await generateRefreshAndAcessToken(user._id);

        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", newRefreshToken, options).json(
            new ApiResponse(200, {}, "Access token refreshed ")
        )

    } catch (error) {
        throw new ApiError(404, "user not find  invalid refresh Token")
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldpassword, newpassword } = req.body;
    const user = User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldpassword);
    if (!isPasswordCorrect) {
        throw new ApiError(404, "invalid old Password");
    }
    user.password = newpassword;
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(new ApiResponse(200, {}, "Password changed Successfully"));
})

const getuser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "User fetched Successfully"))
        ;
})


const updateAccountDetail = asyncHandler(async (req, res) => {
    const { fullname, email } = req.body;
    if (!fullname || !email) {
        throw new ApiError(404, "All fields is required");
    }
    const updateAccountDetail = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                fullname,
                email: email,
            },
        },
        { new: true },
    ).select("-password")

    return res.status(200).json(new ApiResponse(200, "User details updated Successfully"))
})

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
        throw new ApiError(401, "Avatar file missing");
    }
    const avatar = await uploadonCloudinary(avatarLocalPath);
    if (!avatar) {
        throw new ApiError(404, "cloudinary path not found");
    }
    const avatarchanged = await User.findByIdAndUpdate(req.user?._id,
        {
            $set: {
                avatar: avatar
            }
        },
        { new: true },
    ).select("-password");

    return res.status(200).json(new ApiResponse(200, {}, "avatar changed successfully"))
})

export {
    generateRefreshAndAcessToken, registerUser, LoginUser, LogoutUser, refreshAccessToken, changeCurrentPassword
    , getuser, updateAccountDetail, updateUserAvatar
}

