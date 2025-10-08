import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js'
import { calculateAge } from '../utils/helper.js';


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


export const getDoctorDashboardData=async(req,res) => {
    try {
        const doctor=req.doctor;
        if(!doctor){
            return res.json({success:false,message:"Doctor not found"})
        }
        const appointmentsCount=await Appointment.countDocuments({doctor:doctor._id});
        const patient=await Appointment.distinct("user",{doctor:doctor._id})
        console.log("PATIENT",patient)
        const patientsCount=patient.length;

        const completedAppointment=await Appointment.find({
            doctor:doctor._id,
            status:"completed"
        })
        const earnings=completedAppointment.reduce((sum,app) => sum + (app.amount || 0),0);
        
         res.json({ success: true, message: "Doctor dashboard data fetched successfully",data:{
                appointmentsCount,
                patientsCount,
                earnings
         } });
    } catch (error) {
        console.error(error)
        res.json({success:false,message:"Server error"})

    }
}


export const getDoctorPatients=async(req,res) => {
    try {
       

        const appointments=await Appointment.find({doctor:req.doctor._id}).populate("user");

        const patientsMap= new Map();

        appointments.forEach(appt => {
            const user=appt.user;
            if(!user) return ;
            const id=user._id.toString();
            if(!patientsMap.has(id)){
                patientsMap.set(id,{
                    patient:{
                        _id:user.id,
                        name:user.name,
                        email:user.email,
                        phone:user.phone,
                        age:calculateAge(user.dob.toString()),
                    },
                    totalVisits:1,
                    lastVisit:appt.date
                });

            }else {
                const existing = patientsMap.get(id);
                existing.totalVisits +=1;
                if(new Date(appt.date) > new Date(existing.lastVisit)){
                    existing.lastVisit=appt.date;
                };
                patientsMap.set(id,existing)

            }
        });
        const patientStats=Array.from(patientsMap.values());
     res.json({success:true,patients:patientStats})
        
    } catch (error) {
        console.error(error);
        res.json({success:false,messaage:"Server error"})
        
    }
   
}