import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import authRoutes from './routes/authRoute.js';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRoutes from './routes/adminRoute.js';
import doctorRoutes from './routes/doctorRoute.js';
import userRoutes from './routes/userRoute.js';
import appointmentRoutes from './routes/appointmentRoute.js';
//app config
const app = express();
const port = process.env.PORT || 5000;

connectDB();
connectCloudinary();

//middlewares
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor",doctorRoutes)
app.use("/api/user",userRoutes)
app.use("/api/appointment",appointmentRoutes)
app.get("/",(req,res) => {
    res.send("API WORKING...")
})


app.listen(port,()=>console.log(`listening on localhost:${port}`));