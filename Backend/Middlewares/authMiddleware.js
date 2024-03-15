import jwt from "jsonwebtoken";
import StudentModel from "../Models/studentModel.js";
import teacherModel from "../Models/teacherModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, "0822IT21");
        const student = await StudentModel.findById(decoded?.id);
        if (!student) {
          return res
            .status(401)
            .json({ success: false, message: "Invalid token" });
        }
        req.student = student;
        next();
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Token not provided" });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token format" });
    }
  } catch (err) {
    console.error("Error in authMiddleware:", err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await StudentModel.findById(req.student._id);
    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

//Teacher acceess
export const isTeacher = async (req, res, next) => {
  try {
    const user = await teacherModel.findById(req.user._id);
    console.log(req);
    if (user.role !== "teacher") {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

//Protected Routes token base
export const requireTeacherSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, "teachertoken");
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
