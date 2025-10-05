import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    address:{
        type:String
    },
    gender:{
        type:String,
        enum:['male','female','not specified'],
        default:"not specified"
    },
    dob:{
        type:String,
        default:"not specified"
    },
    phone:{
        type:String,
        default:"00000000000"
    },
    role :{
        type:String,
        enum:['user','admin','doctor'],
        default:'user'
    }

},{
    timestamps:true
});
userSchema.pre('save',async function(next){
    const user=this;
    if(!user.isModified('password')){
        return next();
    }
    
    try {
        const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(user.password,salt);
    user.password=hash;
    next();
    } catch (error) {
        next(error);
    }
});


const  User=mongoose.model('User',userSchema);


export default User;