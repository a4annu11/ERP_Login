import express from "express";
import cors from "cors";
import connectDB from "./Database/db.js";
import studentRoutes from "./Routes/studentRoutes.js";

const app = express();

connectDB();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/student", studentRoutes);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
