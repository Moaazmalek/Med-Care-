// controllers/userController.js (or wherever updateProfile is located)
import User from "../models/User.js";
import {v2 as cloudinary } from 'cloudinary';

export const updateProfile = async (req, res) => {
  try {
    // Multer populates req.body with text fields and req.file with the file
    const { name, phone, address, dob, gender } = req.body;
    const userId = req.user._id; // Assuming req.user is populated by an auth middleware
    const imageFile = req.file; // Multer makes the uploaded file available here

    console.log("USER ID", userId);
    console.log("Received fields:", { name, phone, address, dob, gender });
    console.log("Received imageFile:", imageFile);
    const updatedData = { name, address, phone, dob, gender };

    if(name) updatedData.name = name;
    if(address) updatedData.address = address;
    if(phone) updatedData.phone = phone;
    if(dob) updatedData.dob = dob;
    console.log("UPDATED DATA",updatedData)

    if (imageFile) {
      // Ensure imageFile.buffer is used if memoryStorage is configured
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        folder: "MedCare",
        resource_type: "image",
        // You might need to specify the file type if not automatically detected by Cloudinary
        // format: imageFile.mimetype.split('/')[1] // e.g., 'jpeg', 'png'
      });
      if (imageUpload) updatedData.image = imageUpload.secure_url;
    }

    await User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true });
    const updatedUser = await User.findById(userId).select("-password");

    res.json({ success: true, message: "Profile Updated Successfully", user:updatedUser});

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};