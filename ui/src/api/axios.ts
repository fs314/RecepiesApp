import axios from "axios";
import { BASE_URL } from "../config/urlConfig";

//setting base url in one single place
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
