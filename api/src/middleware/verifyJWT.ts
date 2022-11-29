import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const verifyJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  console.log("fafjakfanjk");
  if (!authHeader) return res.sendStatus(401); //unauthorized

  console.log(authHeader);

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN as string,
    (error: any, decoded: any) => {
      if (error) return res.sendStatus(403); //forbidden
      req.user = decoded.username;
      return next();
    }
  );
};

export default verifyJWT;
