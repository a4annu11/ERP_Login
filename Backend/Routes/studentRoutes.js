import express from "express";
import {
  loginController,
  registerController,
} from "../Controllers/studentControllers.js";

const router = express.Router();

//register
router.post("/register", registerController);
router.post("/login", loginController);

export default router;
