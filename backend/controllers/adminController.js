import {emailValidator} from '../utils/validation_schema.js'
import User from '../models/User.js'
import Doctor from '../models/Doctor.js'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'

//API for adding doctor

const addDoctor=async (req, res) => {
    try {
        const { name, email,password, speciality,fees,address,experience,degree,about } = req.body;
        const imageFile=req.file
        if (!name || !email || !password || !speciality || !fees || !address || !experience || !degree || !about || !imageFile) {
            return res.status(400).json({success:false,message:"Missing details"});
        }
        
        if(emailValidator.safeParse(email).success===false){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Password must be at least 8 characters long"})
        }

        //hashing password
        const imagUpload=await cloudinary.uploader.upload(imageFile.path,{
            folder:"prescripto",
            resource_type:"image"
        })

        const imageUrl=imagUpload.secure_url;
        let existingUser=await User.findOne({email});
        if(existingUser){
            return res.json({success:false,message:"User with this email already exists"})
        }
        const user=await User.create({
            name,email,password,role:"doctor"
            ,image:imageUrl,address
        })
        
        const doctor=new Doctor({
            user:user._id,
            speciality,
            fees,
            experience,
            degree,
            about,
            date:Date.now(),
        });
       await doctor.save();
       
        res.status(201).json({success:true,message:"Doctor added successfully",doctor})

    } catch (error) {
        console.error(error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

// API for getting all doctors
const getAllDoctors=async (req,res)=>{
    try {
        const doctors=await Doctor.find().populate("user","name email ");
        res.json({success:true,doctors});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
    }
}


export { addDoctor,getAllDoctors };