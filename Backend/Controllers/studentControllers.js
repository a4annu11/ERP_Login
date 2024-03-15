import { comparePassword, hashPassword } from "../Helper/hashFunction.js";
import studentModel from "../Models/studentModel.js";

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
      return res.send({ message: "Phone no is Required" });
    }

    //check student
    const existingUser = await studentModel.findOne({ email: email });
    //existing users
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Student already exists",
      });
    }
    //register student
    const hashedPasssword = await hashPassword(password);
    //save
    const user = await new studentModel({
      name,
      email,
      password: hashedPasssword,
      batch,
    }).save();

    res.status(200).send({
      success: true,
      message: "Student Register successfully",
      user,
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
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check std
    const user = await studentModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email does not exist",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Password does not match",
      });
    }
    res.status(200).send({
      success: true,
      message: "Login successful",
      user,
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
