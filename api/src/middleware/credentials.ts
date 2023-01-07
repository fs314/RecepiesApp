import allowedOrigins from "../config/allowedOrigins";

const credentials = (req: any, res: any, next: any) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true); //to avoid CORS error
    res.header(
      "Access-Control-Allow-Headers",
      "authorization, access-control-allow-origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
  }
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

export default credentials;
