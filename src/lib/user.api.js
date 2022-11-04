import axiosClient from "./axiosClient";

const signup = (credentials) => {
  axiosClient.post("/user/signup", credentials);
};

const signin = (credentials) => {
  return axiosClient.post("/user/signin", credentials);
};

const getCurrentUser = async () => {
  return await axiosClient
    .get("/user")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export { signup, signin, getCurrentUser };
