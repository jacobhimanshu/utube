import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
// import { app } from "../app.js";
const dbconnect = async() =>{
          try{
       const connectioninstant =  await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`Mongodb connected !! DB HOSt: ${connectioninstant.connection.host}`)
          }catch(err){
            console.log("error",err);
            process.exit(1);
          }
}

export default dbconnect;