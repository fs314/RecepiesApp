import express from "express";
//import cors from 'cors'
import dbMock from "./config/dbMock/mockData.json";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send(dbMock);
});

app.listen(port, () => {
  console.log("Server is running");
});
