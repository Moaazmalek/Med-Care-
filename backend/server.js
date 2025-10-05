import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import authRoutes from './routes/authRoute.js';
import connectDB from './config/mongodb.js';


//app config
const app = express();
const port = process.env.PORT || 5000;
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/",(req,res) => {
    res.send("API WORKING...")
})


app.listen(port,()=>console.log(`listening on localhost:${port}`));