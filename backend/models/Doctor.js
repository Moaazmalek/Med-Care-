import mongoose from 'mongoose'

const doctorSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    available: {
        type: Boolean,
        default: true
    },
    fees:{
        type:Number,
        required:true
    },
    slots_booked:{
        type:Object,
        default:{}
    },
    date:{
        type:Number,
    }
},{
    minimize:false,
    timestamps:true
})


const Doctor=mongoose.model('Doctor',doctorSchema);
export default Doctor;