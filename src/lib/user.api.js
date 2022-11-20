import axiosClient from "./axiosClient";

const signup = async (credentials) => {
  return await axiosClient.post("/user/signup", credentials);
};

const signinUser = async (credentials) => {
  return await axiosClient.post("/user/signin", credentials);
};

const logoutUser = async () => {
  return await axiosClient.get("/user/logout");
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

const authenticateUsingGmail = async () => {
  return await axiosClient.get("/auth/google");
};

const _addUserAddress = async (payload) => {
  return await axiosClient.post("/user/address", payload);
};

export {
  signup,
  signinUser,
  getCurrentUser,
  logoutUser,
  _updateUser,
  sendEmailVerification,
  authenticateUsingGmail,
  _addUserAddress,
};
