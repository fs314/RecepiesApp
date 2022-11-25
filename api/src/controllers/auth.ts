import jwt from "jsonwebtoken";

export const authenticateToken = (req: any, res: any, next: any) => {
  try {
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
  } catch (e) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
