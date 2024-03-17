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

import { uploadAttendance } from "../Controllers/attendanceController.js";

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

router.post("/upload", uploadAttendance);

export default router;
