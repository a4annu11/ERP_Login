import { comparePassword, hashPassword } from "../Helper/hashFunction.js";
import teacherModel from "../Models/teacherModel.js";
import JWT from "jsonwebtoken";

export const createTeacherController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validations
    if (!name || !email || !password) {
      return res.send({ error: "All field is Required" });
    }
    //check
    const exisitingTeacher = await teacherModel.findOne({ email });
    //exisiting user
    if (exisitingTeacher) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new teacherModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "Teacher Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Creating Teacher",
      error,
    });
  }
};

//teacher login
export const teacherloginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check
    const user = await teacherModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, "teachertoken", {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//test controller
export const teacherTestController = (req, res) => {
  res.send("Teacher Protected Route");
};
