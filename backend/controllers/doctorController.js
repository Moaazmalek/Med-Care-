import Doctor from '../models/Doctor.js'


export const changeAvailability=async(req,res) => {
    const { id, available } = req.body;

    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        doctor.available = available;
        await doctor.save();
        const populatedDoctor=await doctor.populate("user","name email phone image role")
        res.json({ success: true, message: "Doctor availability updated", doctor:populatedDoctor });
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in availability"});
        
    }

}

export const getDoctorById=async(req,res) => {
    const {id}=req.params;
    try {
        const doctor= await Doctor.findById(id);
        if(!doctor){
            return res.json({success:false,message:"Doctor not found"})
        }
        const populatedDoctor=await doctor.populate("user","name email phone image role address")
         res.json({ success: true, message: "Doctor availability updated", doctor:populatedDoctor });
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Server error"})
    }
}

// API for getting all doctors
export const getAllDoctors=async (req,res)=>{
    try {
        const doctors=await Doctor.find().populate("user","name  phone image dob role address ");
        res.json({success:true,doctors});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
    }
}

export const getDoctorByToken=async(req,res) => {
    try {
        const doctor=req.doctor;
        if(!doctor){
            return res.json({success:false,message:"Doctor not found"})
        }
        const populatedDoctor=await doctor.populate("user","name email phone image role address")
         res.json({ success: true, message: "Doctor fetched successfully", doctor:populatedDoctor });
    } catch (error) {
        res.json({success:false,message:"Server error"})
        
    }
}