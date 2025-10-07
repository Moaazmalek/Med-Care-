import { Router } from "express";
import { getDoctorById,getAllDoctors } from "../controllers/doctorController.js";

const router=Router()

/**
 * @route /api/doctor/
 * @method GET
 * @description API for getting all doctors
 * @access PUBLIC
 */
router.get("/",getAllDoctors)
/**
 * @route /api/doctor/get-doctor-by-id
 * @method POST
 * @description API for getting doctor by id
 * @access PRIVATE
 * @body {id}
 */
router.get('/:id',getDoctorById);


export default router;