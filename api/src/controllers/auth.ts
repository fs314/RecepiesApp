import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user";
import bcrypt from "bcrypt";

dotenv.config();

//middleware - where to use?
const authenticateToken = (req: any, res: any, next: any) => {
  //Get auth headervalue
  const authHeader = req.headers["authorization"];
  //Check if bearer is undefined
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
    const username = req.body.username;
    const password = req.body.password;

    const registeredUsername = await User.findOne({
      username,
    });

    const isPasswordMatch =
      registeredUsername &&
      (await bcrypt.compare(password, registeredUsername.password));

    if (registeredUsername && isPasswordMatch) {
      //returns first object that has at least one the two fieldws matching - how to get union of both?
      const user = { name: username };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN as string);
      res.json({ accessToken: accessToken });
    } else {
      res.status(409).send({
        message:
          "Cannot login. Please check the fields you have entered are correct. ",
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(409).send({ message: error.message });
  }
};

export const registerUser = async (req: any, res: any) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10); //is going to show normally on the call??
    if (!password)
      res.status(500).send({ message: "password not hashed correctly" });

    const user = await User.create({
      username: req.body.username,
      password: password,
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
