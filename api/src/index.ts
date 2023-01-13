import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import accountRoutes from "./routes/accountRoutes";
import recipesListingsRoutes from "./routes/recipesListingsRoutes";
import refreshTokenRoutes from "./routes/refreshTokenRoutes";
import credentials from "./middleware/credentials";

dotenv.config();

const app = express();
const port = 4050;

// order matters - works like waterfall
app.use(express.json());
// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
app.use(cors());
app.use(cookieParser());

app.use("/account", accountRoutes);
app.use("/refresh", refreshTokenRoutes);

app.use("/recipes-listings", recipesListingsRoutes);

app.listen(port, () => {
  console.log("Server is running");
});

mongoose
  .connect(process.env.DB_CONNECT as string)
  .then(() => {
    console.log(`Connected to DB succesfully`);
  })
  .catch((error: any) => console.log(error));
