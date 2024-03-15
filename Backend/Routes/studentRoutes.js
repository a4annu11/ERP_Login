import express from "express";
import {
  loginController,
  registerController,
  updateStudent,
} from "../Controllers/studentControllers.js";
import {authMiddleware} from "../Middlewares/authMiddleware.js";

const router = express.Router();

//register
router.post("/register", registerController);
router.post("/login", loginController);
router.put("/edit",authMiddleware, updateStudent);
export default router;
