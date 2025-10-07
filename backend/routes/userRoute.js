import { Router } from "express";
import { updateProfile } from "../controllers/userController.js";
import {protect} from '../middleware/authMiddleware.js'
import upload from '../middleware/multer.js'
const router = Router();

/**
 * @route /api/user/update-profile
 * @method PUT
 * @description API for updating user profile
 * @access PRIVATE
 * @body {name,phone,address,dob,gender}
 * @file image
 * @response {success,message}
 */
router.put("/update-profile",protect,upload.single('image'),updateProfile)



export default router;