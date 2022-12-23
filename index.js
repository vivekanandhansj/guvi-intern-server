import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";

const app = express();
dotenv.config();

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to DB!");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(
  cors({
    origin: "*",
  })
);


app.use(express.json());
app.use("/api/auth",authRoutes )
 app.use("/api/user", userRoutes)


app.get("/", (req, res) => res.send(`Server Running`));

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong from backend";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });


app.listen(process.env.PORT, () => {
  connect();
  console.log("connected to server!");
});