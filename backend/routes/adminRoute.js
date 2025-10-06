import { Router } from "express";
import { addDoctor, getAllDoctors } from "../controllers/adminController.js";
import upload from '../middleware/multer.js'
import { admin, protect } from "../middleware/authMiddleware.js";

const router = Router();
/**
 * @route /api/admin/add-doctor
 * @method POST
 * @description API for adding doctor
 * @access PRIVATE
 */
router.post("/add-doctor",protect,admin,upload.single('image'),addDoctor)
router.get("/all-doctors",protect,admin,getAllDoctors)


export default router;
