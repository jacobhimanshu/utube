import {Router} from "express";
import {registerUser} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"


const router = Router();
router.route("/register").post(
         upload.fields([                    //we have used the multer here for the file uploading purpose this is also an middleware
            {
            name:"avatar",
            maxCount:1
            },{
               name:"coverimage",
               maxCount:1
            }
         ]),
       registerUser)


export default router;