import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../utils/validation_schema.js";


export const register = async (req, res) => {
  const { name, email, password } = registerSchema.parse(req.body);

  try {
    const existingUser=await User.findOne({email});
    if(existingUser) return res.status(409).json({success:false,message:"User already exists"});

    const newUser=new User({
        name,
        email,
        password,
    });
    console.log(newUser)
    await newUser.save();
    console.log(name,email,password,"registered")
    res.status(201).json({success:true,message:"Registration successful. Please login."})
  } catch (error) {
    console.error(error)
    res.json({success:false,message:"Server error"})
  }
};


export const login =async(req,res) => {
    const {email,password}=loginSchema.parse(req.body);
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({success:false,message:"Invalid credentials"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({success:false,message:"Invalid credentials"})
        }

        const token =jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{
            expiresIn:"1d"
        });
        res.status(200).json({success:true,message:"Login successful",token});
        
    } catch (error) {
        res.json({success:false,message:"Server error"})
        
    }

}

export const me=async(req,res) => {
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({success:false,message:"No token provided"});
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded._id).select("-password");
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        res.json({success:true,user});
    } catch (error) {
        res.json({success:false,message:"Server error"})
        
    }
}

