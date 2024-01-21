import axios from "axios";
import { SERVER_URL } from "../Utils/urls";

const axiosClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosClient;
