import User from "../models/User.js";
import {v2 as cloudinary } from 'cloudinary';
export const updateProfile=async(req,res) => {
  
  
try {
  const {name,phone,address,dob,gender}=req.body;
  const userId=req.user._id;
  const imageFile=req.file;
  console.log("USER ID",userId)
  if(!name || !phone || !dob || !gender ) {
    console.log("Missing fields",gender,name,phone,address,dob,imageFile);
    return res.json({success:false,message:"Data Missing"})
  }
    
    const updatedData={name,address,phone,dob,gender};
    if(imageFile){
  const imageUpload = await cloudinary.uploader.upload(imageFile.path, { folder:"MedCare", resource_type:"image" });
  if(imageUpload) updatedData.image = imageUpload.secure_url;
}

await User.findByIdAndUpdate(userId, updatedData);
const updatedUser=await User.findById(userId).select("-password");
    res.json({success:true,message:"Profile Updated Successfully",user:{
      name:updatedUser.name,
      email:updatedUser.email,
      phone:updatedUser.phone,
      address:updatedUser.address,
      dob:updatedUser.dob,
    }});

} catch (error) {
    res.json({message:"Server error"});
}
}