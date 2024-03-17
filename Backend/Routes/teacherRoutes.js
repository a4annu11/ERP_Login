import express from "express";

import {
  authMiddleware,
  isAdmin,
  isTeacher,
  requireTeacherSignIn,
} from "../Middlewares/authMiddleware.js";
import {
  createTeacherController,
  teacherTestController,
  teacherloginController,
} from "../Controllers/teacherControllers.js";

const router = express.Router();

//register
router.post("/create", authMiddleware, isAdmin, createTeacherController);
router.post("/teacher-login", teacherloginController);

//test teacher Protected Route
router.get(
  "/teacher-test",
  requireTeacherSignIn,
  isTeacher,
  teacherTestController
);
export default router;
