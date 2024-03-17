import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://e-campus:e-campus@e-campus.dcly99p.mongodb.net/ERP_Login"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect MongoDB", error);
  }
};

export default connectDB;
