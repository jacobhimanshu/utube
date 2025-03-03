import  {asyncHandler} from "../utilis/asyncHandler.js"
import {ApiError} from "../utilis/ApiErro.js"
import {User} from "../models/User.model.js"
import {uploadoncloud} from "../utilis/Cloudarnary.js"
import { ApiResponse } from "../utilis/ApiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{
           
    const {email,username,fullname,password} = req.body;    //we get teh user details from frontend side 
    // console.log(req.body);

    //now let have the validation fields
    if(
        [email,username,fullname,password].some((fields)=>fields?.trim()==="")
    )  {
            throw new ApiError(404,"all the fields are required to fill")
    }
    
    
    //now we are going to check the if the username or the email has already existing with the same name or email
    const existingUser = await User.findOne({
        $or : [{username},{email}] 
    })
    if(existingUser){
        throw new ApiError(409,"user with these email or username has already been registered")
    }
    // console.log(existingUser)

    
    //now we are going to check for the imaages and the avatar 
    const avatarlocalpath =req.files?.avatar[0]?.path 
    // console.log("avatarpath",avatarlocalpath);  
    const coverImagelocalpath  = req.files?.coverimage[0].path
    // console.log("Multer processed files:",avatarlocalpath ); 

     if(!avatarlocalpath){
        throw new ApiError(404,"avatar is required")
    }

         //now we willupload the avatar and the coverimage on the clounadry
        const avatar  = await uploadoncloud(avatarlocalpath);
         console.log("avarta",avatar)
        const coverimage  = await uploadoncloud(coverImagelocalpath);

        if(!avatar){
         throw new ApiError(404,"avatar is always required")
        }

    const user = await User.create({
            fullname,
            password,
              avatar: avatar.url,
           coverimage:coverimage?.url ||"",
           username:username.toLowerCase()
        })
   
       const createduser =  user.findById(user._id).select(
        "-password -refreshToken"                       //remove the passsword and teh refreshToken by doing the select emthod andapply the -sign in the string
       )

         //check for the user creation 
       if(!createduser){         
        throw new ApiError(500,"something went wrong while registering the user")
       }

       
    //    now return teh respose 
    return res.status(201).json(
        new ApiResponse(200,createduser,"User registered successully")
    )
}
)

export {registerUser}
// export default registerUser