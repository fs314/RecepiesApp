import UserAccount from "../models/UserAccount";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import accountSchemaValidation from "../validation/account";

dotenv.config();

export const registerUser = async (req: any, res: any) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const { validationError } = await accountSchemaValidation.validateAsync(
      req.body
    );

    if (validationError) {
      res.status(400).send("[ ERROR ] inputs validation failed: ", {
        message: validationError.details[0].message,
      });
    }

    const registeredUsername = await UserAccount.findOne({
      username,
    });

    if (registeredUsername) {
      res.status(400).send({ message: "[ ERROR ] username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    UserAccount.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });

    res.status(200).send("Account registered successfully");
  } catch (error: unknown) {
    if (error instanceof Error)
      res
        .status(400)
        .send(
          "[ ERROR ] Something went wrong, please try again later. error:",
          { message: error.message }
        );
  }
};

export const loginUser = async (req: any, res: any) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    //Check that username and password have been inputted
    if (!username || !password) {
      res.status(500).send({ message: "[ ERROR ] missing required details" });
    }

    //Get account associated with username
    const registeredUsername = await UserAccount.findOne({
      username,
    });

    if (!registeredUsername) {
      res.status(204).send({ message: "There was no match for this username" });
      return;
    }

    const isPasswordMatch =
      registeredUsername &&
      (await bcrypt.compare(password, registeredUsername.password));

    //If user is autheticated assign a new jwt token
    if (registeredUsername && isPasswordMatch) {
      const user = { username: username };

      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN as string, {
        expiresIn: "30s",
      });

      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN as string, {
        expiresIn: "300s",
      });

      //Saving refresh token in db
      await UserAccount.findOneAndUpdate(
        { username: username },
        { refreshToken: refreshToken },
        { multi: true }
      );

      res
        .status(200)
        //better than storing in local storage or cookies that are accessible to js
        .cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        }) //1 day in milliseconds
        .send({ accessToken: accessToken });
    } else {
      res.status(400).send({
        message:
          "[ ERROR ] Login failed. Username and/or password are not valid. ",
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(400).send("[ ERROR ] Login failed with the following error:", {
        message: error.message,
      });
  }
};

export const logoutUser = async (req: any, res: any) => {
  // if (allowedOrigins.includes(req.headers.origin)) {
  //   res.header("Access-Control-Allow-Origin", req.headers.origin);
  // }

  //On client delete also the access token - need to be done on fe
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //no content

  const refreshToken = cookies.jwt;

  const isRefreshTokenInDb = await UserAccount.findOne({
    refreshToken: refreshToken,
  });

  if (!isRefreshTokenInDb) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  //Delete refreshToken in db
  await UserAccount.findOneAndUpdate(
    { refreshToken: refreshToken },
    { refreshToken: "" },
    { multi: true }
  );

  res.clearCookie("jwt", { httpOnly: true }); // in prd use {secure: true} to only serve on https
  return res.sendStatus(204);
};
