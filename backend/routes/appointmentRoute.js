import { Router} from 'express';
const router = Router();
import {bookAppointment,cancelAppointment,getAppointmentsByDoctor,getUserAppointments,completeAppointment} from '../controllers/appointmentController.js';
import {protect} from '../middleware/authMiddleware.js';


/**
 * @route POST /api/appointment/book-appointment
 * @desc Book an appointment
 * @access Private
 */
router.post('/book-appointment',protect,bookAppointment)

/**
 * @route GET /api/appointment/doctor/:doctorId
 * @desc Get appointments by doctor
 * @access Private
 */
router.get('/doctor/:doctorId',protect,getAppointmentsByDoctor)
router.get('/user/:userId',protect,getUserAppointments)
router.post("/cancel-appointment/:appointmentId",protect,cancelAppointment)
router.post("/complete-appointment/:appointmentId",protect,completeAppointment)

export default router;

