import dotenv from "dotenv"
import dbconnect from "./db/indexdb.js";
import { app } from "./app.js";
dotenv.config({ path: './.env' });

  
dbconnect()
.then(()=>{
     app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`server is running on port ${process.env.PORT}`)
     })
})
.catch((err)=>{
    console.log("Mongodb connection is falided",err);
})