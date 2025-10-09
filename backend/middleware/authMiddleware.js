import jwt from "jsonwebtoken";
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
        token=req.headers.authorization.split(" ")[1];

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log("Decoded token:",decoded);
        req.user=await User.findById(decoded._id).select("-password");
        next()
    } catch (error) {
        console.log("Token verification failed",error)
        res.status(401).json({
                message:"Not authorized, token failed"
            });
    }
  }else {
    res.status(401).json({message:"Not authorized, no token provided"})
  }
};

export const admin=(req,res,next) =>{
    if(req.user && req.user.role==="admin"){
        next()
    }else {
        res.status(403).json({
            message:"Not authorized as an admin"
        })
    }
}



export const protectDoctor=async(req,res,next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
      token=req.headers.authorization.split(" ")[1];
      const decoded=jwt.verify(token,process.env.JWT_SECRET);
      const user=await User.findById(decoded._id).select("-password");
      if(user.role !== "doctor"){
        return res.status(403).json({message:"Not authorized as a doctor"})
      }
      const doctor=await Doctor.findOne({user:user._id});
      if(!doctor){
        return res.status(403).json({message:"No doctor profile found"})
      }
      req.user=user;
      req.doctor=doctor;
      next();
    } catch (error) {
      console.log("Token verification failed",error)
      res.status(401).json({
        message:"Not authorized, token failed"
      });
    }
  }
}