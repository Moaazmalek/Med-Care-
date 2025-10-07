import { Router } from "express";
import { addDoctor, getAllAppointments, getAllDoctors ,adminDashboard} from "../controllers/adminController.js";
import upload from '../middleware/multer.js'
import { admin, protect } from "../middleware/authMiddleware.js";
import { changeAvailability } from "../controllers/doctorController.js";

const router = Router();
/**
 * @route /api/admin/add-doctor
 * @method POST
 * @description API for adding doctor
 * @access PRIVATE
 */
router.post("/add-doctor",protect,admin,upload.single('image'),addDoctor)
/**
 * @route /api/admin/all-doctors
 * @method GET
 * @description API for getting all doctors
 * @access PRIVATE
 */
router.get("/all-doctors",protect,admin,getAllDoctors)
/**
 * @route /api/admin/change-availability
 * @method PUT
 * @description API for changing doctor availability
 * @access PRIVATE
 * @body {id,available}
 */
router.put("/change-availability",protect,admin,changeAvailability);
/**
 * @route /api/admin/all-appointments
 * @method GET
 * @description API for getting all appointments
 * @access PRIVATE
 */
router.get("/all-appointments",protect,admin,getAllAppointments)

/**
 * @route /api/admin/dashboard-data
 * @method GET
 * @description API for getting admin dashboard data
 * @access PRIVATE
 */
router.get("/dashboard-data", protect, admin, adminDashboard);

export default router;
