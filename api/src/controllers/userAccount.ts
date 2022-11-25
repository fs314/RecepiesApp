import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserAccount from "../models/userAccount";
import bcrypt from "bcrypt";

dotenv.config();

export const authenticateUser = async (req: any, res: any) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    //Check that username and password have been inputted
    if (!username || !password) {
      res
        .status(500)
        .json({ message: "Please enter all the required details" });
    }

    //Check that an user exists and that username and password match to one account
    const registeredUsername = await UserAccount.findOne({
      username,
    });

    const isPasswordMatch =
      registeredUsername &&
      (await bcrypt.compare(password, registeredUsername.password));

    //If user is autheticated assign a new jwt token
    if (registeredUsername && isPasswordMatch) {
      //returns first object that has at least one the two fieldws matching - how to get union of both?
      const user = { name: username };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN as string);
      res
        .status(400)
        .cookie({ token: accessToken })
        .send({ message: "Welcome back! your login was successful" });
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
    //Check that username and password have been inputted
    if (!req.body.username || !req.body.password) {
      res.json({ message: "Please enter all the required details" });
    }

    //Check if the username is already taken or not
    const usernameExists = await UserAccount.findOne({
      username: req.body.username,
    });

    if (usernameExists) {
      return res.status(500).json({
        message:
          "This username is already taken. User already exist with the given username. Please try again with a different one",
      });
    }

    const password = await bcrypt.hash(req.body.password, 10);
    if (!password)
      res.status(500).send({ message: "password not hashed correctly" });

    const user = await UserAccount.create({
      username: req.body.username,
      password: password,
    });

    const accessToken = jwt.sign(
      { name: req.body.username },
      process.env.ACCESS_TOKEN as string
    );
    // res
    //   .status(500)
    //   .send(`New user registered with username: ${req.body.username}`);
    return res
      .status(400)
      .cookie({ token: accessToken })
      .send(`New user registered with username: ${req.body.username}`);
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
