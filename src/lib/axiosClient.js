import axios from "axios";

const BASE_URL = "http://localhost:3001";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Private-Network': 'true',
  },
  withCredentials: true,
});
export default axiosClient;
