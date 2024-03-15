import { comparePassword, hashPassword } from "../Helper/hashFunction.js";
import studentModel from "../Models/studentModel.js";
import  generateToken  from "../Middlewares/jwtToken.js";
import  generateRefreshToken  from "../Middlewares/refreshToken.js";
import ValidateMongodbID from "../Helper/ValidateMongodbID.js";
import jwt from "jsonwebtoken"

export const registerController = async (req, res) => {
  try {
    const { name, email, password, batch } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!batch) {
      return res.send({ message: "batch is Required" });
    }

    //check student
    const existingStudent = await studentModel.findOne({ email: email });
    //existing students
    if (existingStudent) {
      return res.status(200).send({
        success: false,
        message: "Student already exists",
      });
    }
    //register student
    const hashedPasssword = await hashPassword(password);
    //save
    const student = await new studentModel({
      name,
      email,
      password: hashedPasssword,
      batch,
    }).save();

    res.status(200).send({
      success: true,
      message: "Student Register successfully",
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Resgistration",
      error,
    });
  }
};

//login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // check if the student exists
    const student = await studentModel.findOne({ email });
    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Email does not exist",
      });
    }

    // verify the password
    const match = await comparePassword(password, student.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Password does not match",
      });
    }

    // generate refresh token
    const refreshToken = await generateRefreshToken(student._id);

    // update refresh token in the database
    const updateStudent = await studentModel.findByIdAndUpdate(student._id, {
      refreshToken: refreshToken
    }, { new: true });

    // set refresh token in a cookie with expiration time
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days
    });

    // respond with student details, access token, and refresh token
    res.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      batch: student.batch,
      token: generateToken(student._id),
      refreshToken: refreshToken
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};


// Update student details
export const updateStudent = async (req, res) => {
  const { _id } = req.student;
  // ValidateMongodbID(_id);

  try {
    const uptStudent = await studentModel.findByIdAndUpdate(_id, {
      name: req?.body?.name,
      batch: req?.body?.batch,
    }, {
      new: true
    });
    res.json(uptStudent);
  } catch (err) {
    throw new Error(err);
  }
};