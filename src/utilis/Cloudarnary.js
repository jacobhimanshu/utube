import {v2 as cloudinary} from "cloudinary";
  import fs from "fs"
  cloudinary.config({ 
     cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECREAT
})
        const uploadoncloud = async (localFilePath) =>{
             try{
                      if(!localFilePath) return null
   
                    //  upload the files
                     const response = await cloudinary.uploader.upload(localFilePath,{
                        resource_type:"auto"
                     })

                    //  files has been uploaded
                    console.log("files is uploaded on cloud succesfully",response.url);
                    return response;
             }catch(error){
                console.error("Cloudinary Upload Error:", error);
                    fs.unlinkSync(localFilePath)  //remove the locallly saved tempary files as the upload operatation got failed
                    return null
             }
        }
export {uploadoncloud};

      