import express from "express";
import cors from "cors";
import connectDB from "./Database/db.js";
import studentRoutes from "./Routes/studentRoutes.js";
import morgan from "morgan"

const app = express();

connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use("/api/student", studentRoutes);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
