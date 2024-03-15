import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      default: "teacher",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);
