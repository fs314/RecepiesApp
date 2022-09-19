import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import dbMock from "./config/dbMock/mockData.json";
import recipeRoutes from "./routes/recipe";
import authRoutes from "./routes/auth";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use("/recipes", recipeRoutes);
app.use("/user", authRoutes);

mongoose
  .connect("")
  .then(() => {
    console.log(`Connected to DB succesfully`);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
