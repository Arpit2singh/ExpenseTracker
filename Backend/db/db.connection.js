
import mongoose from "mongoose" ; 
import { dbName } from "../constants.js";

const dbLogic = async() =>{
    try {

        const mongooseInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)
        console.log("db is connected") 
        console.log(`db is connected at the ${mongooseInstance.connection.host}`)
        
    } catch (error) {
        console.log("some error is occured while conencting to the database")
    }
} 

export default dbLogic ; 