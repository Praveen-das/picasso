import axiosClient from "./axiosClient";

const signup = async (credentials) => {
  return await axiosClient.post("/user/signup", credentials);
};

const signinUser = async (credentials) => {
  return await axiosClient.post("/user/signin", credentials);
};

const logoutUser = async () => {
  return await axiosClient.post("/user/logout");
};

const updateUser = async (updates) => {
  return await axiosClient.put("/user", updates);
};

const getCurrentUser = async () => {
  return (
    (await axiosClient
      .get("/user")
      .then((res) => res.data)
      .catch((err) => console.log(err.response))) || null
  );
};

export { signup, signinUser, getCurrentUser, logoutUser, updateUser };
