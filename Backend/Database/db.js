import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ERP-Login");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect MongoDB", error);
  }
};

export default connectDB;
