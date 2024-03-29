import UserAccount from "../models/UserAccount";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const handleRefreshToken = async (req: any, res: any) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    //Get account associated with username
    const user = await UserAccount.findOne({
      refreshToken,
    });

    if (!user) res.status(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN as string,
      (err: any, decoded: any) => {
        if (err || user?.username !== decoded.username)
          return res.sendStatus(403); //in case refresh token has been tampered again

        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN as string,
          { expiresIn: "30s" }
        );

        res.send({ accessToken });
      }
    );

    res.status(200).send("Refreshed Token");
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(400).send("[ ERROR ] Login failed with the following error:", {
        message: error.message,
      });
  }
};
