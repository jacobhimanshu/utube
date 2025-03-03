import express from 'express'
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
// these  3 are teh configuration data kis kis fromat me aayge to kaise res dena hai handle krna hai 
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({ extended:true ,limit:"16kb"}))
app.use(express.static("Public"))
app.use(cookieParser());

// import router
import userRouter from './routes/user.routes.js'

// routes declaration
app.use("/api/v1/users",userRouter)
// https:localhost:8000/api/v1/user/register
export {app}