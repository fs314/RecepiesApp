import allowedOrigins from "../config/allowedOrigins";

const credentials = (req: any, res: any, next: any) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true); //to avoid CORS error
    res.header("Access-Control-Allow-Origin", origin);
  }

  next();
};

export default credentials;
