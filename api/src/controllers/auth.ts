import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user";

dotenv.config();

//middleware - where to use?
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split("")[1];
  if (token === "null") return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN as string,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
};

export const authenticateUser = async (req: any, res: any) => {
  try {
    const isUserRegistered = await User.findOne({
      name: req.body.username,
      password: req.body.password,
    });
    console.log(isUserRegistered, "isUserRegistereds ");
    if (isUserRegistered) {
      //returns first object that has at least one the two fieldws matching - how to get union of both?
      const username = req.body.username;
      const user = { name: username };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN as string);
      res.json({ accessToken: accessToken });
    } else {
      res.status(409).send({ message: "User does not exist" });
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(409).send({ message: error.message });
  }
};

export const registerUser = async (req: any, res: any) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.send(`New user registered with username: ${req.body.username}`);
  } catch (error: unknown) {
    if (error instanceof Error)
      res
        .status(409)
        .send(
          "[ ERROR ] Something went wrong, please try again later. error:",
          { message: error.message }
        );
  }
};
