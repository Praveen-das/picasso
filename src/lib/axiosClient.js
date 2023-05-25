import axios from "axios";

// const BASE_URL = "https://artworld-server.vercel.app/";
// const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://artsworld-server.onrender.com";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default axiosClient;
