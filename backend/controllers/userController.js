import User from "../models/User.js";
import {v2 as cloudinary } from 'cloudinary';
export const updateProfile=async(req,res) => {
  const {name,phone,address,dob,gender}=req.body;
  const userId=req.user._id;
  const imageFile=req.file;
  if(!name || !phone || !dob || !gender ) {
    console.log("Missing fields",req.body);
    return res.json({success:false,message:"Data Missing"})
  }
  
try {
    
    const updatedData={name,address,phone,dob,gender};
    if(imageFile){
  const imageUpload = await cloudinary.uploader.upload(imageFile.path, { folder:"MedCare", resource_type:"image" });
  if(imageUpload) updatedData.image = imageUpload.secure_url;
}

await User.findByIdAndUpdate(userId, updatedData);
const updatedUser=await User.findById(userId).select("-password");
    res.json({success:true,message:"Profile Updated Successfully",user:updatedUser});

} catch (error) {
    res.json({message:"Server error"});
}
}