import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

//API to book appointment
export const bookAppointment=async(req,res) => {

    try {
        const {userId,doctorId,date,time}=req.body;
        const doctor=await Doctor.findById(doctorId);
        if(!doctor.available) {
            return res.json({success:false,message:"Doctor not available"});
        }
        let slots_booked=doctor.slots_booked;
        if(slots_booked[date]) {
            if(slots_booked[date].includes(time)) {
                return res.json({success:false,message:"Slot already booked"});
            }else {
                slots_booked[date].push(time);
            }
        }else {
            slots_booked[date]=[];
            slots_booked[date].push(time);
        }
        const userData=await User.findById(userId).select("-password");
        delete doctor.slots_booked;
        const appointment=await  Appointment.create({
            user:userId,
            doctor:doctorId,
            date,
            time,
            amount:doctor.fees,
            bookedAt:Date.now()

        });
        //save new slots
        await Doctor.findByIdAndUpdate(doctorId,{slots_booked});

        const populatedAppointment=await Appointment.findById(appointment._id)
        .populate({
            path:"doctor",
            populate:{path:"user",select:"name email phone image address"},
            select:"speciality degree experience fees about"
        }).
        populate({
            path:"user",
            select:"name email phone image address"
        })
        res.json({success:true,message:"Appointment booked successfully",appointment:populatedAppointment});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Server error"});
    }
}

export const getAppointmentsByDoctor=async(req,res) => {
    try {
        const {date}=req.query;
        const {doctorId}=req.params;

        let filter={doctor:doctorId};
        if(date) {
            filter.date=date;
        }
        
        const appointments=await Appointment.find(filter)
        .populate({'path':'user','select':'name email phone image address'}).sort({createdAt:-1})
        res.json({success:true,appointments});
    } catch (error) {
        console.error(error);
        res.json({success:false,message:"Failed to fetch appointments"});
    }
}

export const getUserAppointments=async(req,res) => {
    try {
        const {userId}=req.params;
        const appointments=await Appointment.find({user:userId})
        .populate({'path':'doctor',populate:{path:'user',select:'name email phone image address'},'select':'speciality degree experience fees about'})
        res.json({success:true,appointments});
    } catch (error) {
        res.json({success:false,message:"Failed to fetch appointments"});
    }   
}

export const cancelAppointment=async(req,res) => {
    try {
        const {appointmentId}=req.params;
        const appointment=await Appointment.findById(appointmentId);
        if(!appointment) {
            return res.json({success:false,message:"Appointment not found"});
        }
       if(appointment.status==="cancelled") {
        return res.json({success:false,message:"Appointment already cancelled"});
       }
       appointment.status="cancelled";
       console.log("APPOINTMENT",appointment);
       await appointment.save();
       //remove slot from doctor's slots_booked
       const doctor=await Doctor.findById(appointment.doctor._id);
       console.log("DOCTROR",doctor);
       const dateKey=new Date(appointment.date).toISOString().split("T")[0]// normalize datekey
       console.log("DATE KEY",dateKey);
       console.log("DOCTOR ID",doctor._id);
        if (doctor && doctor.slots_booked[dateKey]) {
        console.log("DOCTOR SLOTS BOOKED",doctor.slots_booked);
      doctor.slots_booked[dateKey] = doctor.slots_booked[dateKey].filter(
        (slot) => {
            console.log("SLOT",slot,appointment.time);
            return slot !== appointment.time;
        }
      )
      console.log("DOCTOR SLOTS BOOKED AFTER FILTER",doctor.slots_booked);
        if(doctor.slots_booked[dateKey].length===0){
        delete doctor.slots_booked[dateKey]
      }
       doctor.markModified('slots_booked');
       await doctor.save();
        console.log("DOCTOR SLOTS BOOKED AFTER SAVE",doctor.slots_booked);
 
    }
    
       res.json({success:true,message:"Appointment cancelled successfully",appointment});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Server error"});
    }
}
export const completeAppointment=async(req,res) => {
    try {
        const {appointmentId}=req.params;
        const appointment=await Appointment.findById(appointmentId);
        if(!appointment) {
            return res.json({success:false,message:"Appointment not found"});
        }
       if(appointment.status==="completed") {
        return res.json({success:false,message:"Appointment already completed"});
       }
       if(appointment.status==="cancelled") {
        return res.json({success:false,message:"Cancelled appointment cannot be completed"});
       }
       appointment.status="completed";
       await appointment.save();
       //remove slot from doctor's slots_booked
       const doctor=await Doctor.findById(appointment.doctor._id);
        if (doctor && doctor.slots_booked[appointment.date]) {
      doctor.slots_booked[appointment.date] = doctor.slots_booked[appointment.date].filter(
        (slot) => slot !== appointment.time
      )
        if(doctor.slots_booked[appointment.date].length===0){
        delete doctor.slots_booked[appointment.date]
      }
      await doctor.save()
 
    }
    
       res.json({success:true,message:"Appointment cancelled successfully",appointment});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Server error"});
    }
}
