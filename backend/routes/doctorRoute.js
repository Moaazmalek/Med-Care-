import { Router } from "express";
import { getDoctorById,getAllDoctors,getDoctorByToken ,getDoctorDashboardData,getDoctorPatients} from "../controllers/doctorController.js";
import { protectDoctor } from "../middleware/authMiddleware.js";

const router=Router()

/**
 * @route /api/doctor/
 * @method GET
 * @description API for getting all doctors
 * @access PUBLIC
 */
router.get("/",getAllDoctors)
/**
 * @route /api/doctor/me
 * @method GET
 * @description API for getting doctor by token
 * @access PRIVATE
 */
router.get("/me",protectDoctor,getDoctorByToken)
/**
 * @route /api/doctor/dashboard-data
 * @method GET
 * @description API for getting doctor dashboard data
 * @access PRIVATE
 */

router.get("/dashboard-data",protectDoctor,getDoctorDashboardData) 

router.get("/patients",protectDoctor,getDoctorPatients)

/**
 * @route /api/doctor/get-doctor-by-id
 * @method POST
 * @description API for getting doctor by id
 * @access PRIVATE
 * @body {id}
 */

router.get('/:id',getDoctorById);





export default router;