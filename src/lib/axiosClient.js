import axios from "axios";

const BASE_URL = "http://localhost:3001";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const request = ({ ...options }) => {
  axiosPrivate.defaults.headers.common["Authorization"] = "Bearer token";

  return axiosPrivate(options)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export default axiosClient;
