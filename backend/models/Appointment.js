import mongoose from "mongoose";
import User from "./User.js"
import Doctor from "./Doctor.js";

const appointmentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User id is required"]
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:[true,"Doctor id is required"]
    },
    date:{
        type:String,
        required:[true,"Appointment date is required"]
    },
    time:{
        type:String,
        required:[true,"Appointment time is required"]
    },
    reason:{
        type:String
    },
    status:{
        type:String,
        enum:["pending","confirmed","completed","cancelled"],
        default:"pending"
    },
    bookedAt:{
        type:Date,
        default:Date.now
    },
    amount:{
        type:Number,
        required:[true,"Appointment amount is required"]
    },
    payment:{
        type:Boolean,
        default:false
    }

    

},{
    timestamps:true
})


const Appointment=mongoose.model("Appointment",appointmentSchema);
export default Appointment;