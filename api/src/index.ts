import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import dbMock from "./config/dbMock/mockData.json";
import recipeRoutes from "./routes/recipe";

const app = express();
const port = 4000;

app.use("/recipe", recipeRoutes);

app.use(express.json());
app.use(cors());

mongoose
  .connect("")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));

app.get("/", (_req, res) => {
  res.send(dbMock);
});
