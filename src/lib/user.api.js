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

const _updateUser = async (updates) => {
  return await axiosClient.put("/user", updates);
};

const sendEmailVerification = async (data) => {
  return await axiosClient.post("/user/emailverification");
};

const getCurrentUser = async () => {
  return (
    (await axiosClient
      .get("/user")
      .then((res) => res.data)
      .catch((err) => console.log(err.response))) || null
  );
};

export {
  signup,
  signinUser,
  getCurrentUser,
  logoutUser,
  _updateUser,
  sendEmailVerification,
};
