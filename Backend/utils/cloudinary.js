 dotenv.config({
    path : './.env'
}) 

import { configDotenv } from "dotenv";
import asyncHandler from "./asyncHandler.js";
import fs from "fs" ; 
import { v2 as cloudinary } from 'cloudinary'


// console.log(process.env.CLOUDINARY_API_SECRET)
// console.log(process.env.CLOUDINARY_CLOUD_NAME)
// console.log(process.env.CLOUDINARY_API_KEY) 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


console.log(cloudinary.config)

const uploadonCloudinary  = async(localPath) =>{
    console.log(localPath) ; 
    try {
        if(!localPath) return null ;

        const uploadResult = await cloudinary.uploader.upload(localPath , {
            public_id : "sds" , 
            resource_type : 'auto' , 
        });

        console.log(`cloudinary upload successfully ${uploadResult.url}`) ; 

        return uploadResult ; 



    } catch (error) {
        console.log(`failed to upload on cloudinary , ${error.message} `)
        if(fs.existsSync(localPath)){
            fs.unlinkSync(localPath) ; 
        }
        return -1 ; 
    }

}

export default uploadonCloudinary ; 