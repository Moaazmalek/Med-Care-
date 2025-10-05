import { Router } from "express";
import { register, login, me } from "../controllers/authController.js"
const router = Router();

/**
 * @desc    register user
 * @route   POST /api/auth/register
 * @access  Public
 * @body    {name,email,password}
 * @returns {object}  {success,message}
 */
router.post("/register", register);
/**
 * @desc    login user
 * @route   POST /api/auth/login
 * @access  Public
 * @body    {email,password}
 * @returns {object}  {success,message,token}
 */
router.post("/login", login);

/**
 * @desc get user profile
 * @route GET /api/auth/me
 * @access Private
 * @header Authorization: Bearer <token>
 * @returns {object} {success, user}
 */
router.get("/me", me);

export default router;
