import allowedOrigins from "../config/allowedOrigins";

export const getAllRecipes = (req: any, res: any) => {
  if (allowedOrigins.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  res.status(200).send(["tomato pasta", "pizza", "ice cream"]);
};
