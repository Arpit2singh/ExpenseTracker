import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        console.log(process.env.ACCESS_TOKEN_SECRET);
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        console.log(token) ;
        if (!token || typeof token !== "string") {
            throw new ApiError(401, "Access token not found or invalid");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(404, "invalid accessToken")
        }
        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(404, `${error.message}` || `jwt middleware error`)
    }
})

export default verifyJWT; 