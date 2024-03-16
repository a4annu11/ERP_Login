import express from "express";
import {
  forgotPasswordToken, handleRefreshToken,
  loginController, logoutController, ProfileStudent,
  registerController, resetPassword, updatePassword,
  updateStudent, verifyEmail,
} from "../Controllers/studentControllers.js";
import {authMiddleware} from "../Middlewares/authMiddleware.js";

const router = express.Router();

//register
router.post("/register", registerController);
router.post("/forgot-password-token",forgotPasswordToken)
router.get ("/refresh",handleRefreshToken)
router.post("/login", loginController);
router.put("/edit",authMiddleware, updateStudent);
router.put("/password",authMiddleware,updatePassword)
router.put("/reset-password/:token",resetPassword)
router.get('/verify-email/:token', verifyEmail);
router.get ("/logout",logoutController)
router.get ("/profile",authMiddleware,ProfileStudent)

export default router;
