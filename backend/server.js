import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute.js';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRoutes from './routes/adminRoute.js';
import doctorRoutes from './routes/doctorRoute.js';
import userRoutes from './routes/userRoute.js';
import appointmentRoutes from './routes/appointmentRoute.js';

// Load environment variables
dotenv.config();

// App config
const app = express();

// Connect to services
connectDB();
connectCloudinary();

// Middlewares
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/appointment", appointmentRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({ message: "API WORKING..." });
});

app.get("/api/", (req, res) => {
    res.json({ message: "API WORKING..." });
});

// Export for Vercel
export default app;

// Only listen when running locally
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server started on port ${port}`));
}