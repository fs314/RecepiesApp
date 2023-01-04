import axios from "axios";

//setting base url in one single place
export default axios.create({
  baseURL: "http://localhost:4050",
});
