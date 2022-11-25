import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import recipeRoutes from "./routes/recipe";
import accountRoutes from "./routes/userAccount";
import profileRoutes from "./routes/profile";
import { authenticateToken } from "./controllers/auth";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use("/recipes", recipeRoutes);
app.use("/account", accountRoutes);
app.use("/profile", profileRoutes);

app.use("/auth", authenticateToken, (request, response) => {
  response.json({ message: "Authorization Successful" });
});

mongoose
  .connect("")
  .then(() => {
    console.log(`Connected to DB succesfully`);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
