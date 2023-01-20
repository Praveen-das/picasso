import axiosClient from "./axiosClient";

const signupUser = async (credentials) => {
  return await axiosClient.post("/user/signup", credentials).then(res => res.data);
};

const signinUser = async (credentials) => {
  return await axiosClient.post("/user/signin", credentials);
};

const logoutUser = async () => {
  return await axiosClient.get("/user/logout");
};

const _updateUser = async (updates) => {
  return await axiosClient.put("/user/update", updates);
};

const getCurrentUser = async () => {
  return (
    (await axiosClient
      .get("/user")
      .then((res) => res.data)
      .catch((err) => '')) || null
  );
};

const authenticateUsingGmail = async () => {
  return await axiosClient.get("/auth/google");
};

const _addUserAddress = async (payload) => {
  return await axiosClient.post("/user/address", payload);
};

const _updateUserAddress = async (updates) => {
  return await axiosClient.put("/user/address", updates);
};

const _deleteUserAddress = async (id) => {
  return await axiosClient.delete(`/user/address/${id}`).then(res => res.data);
};

const _addToRecentlyViewed = async (id) => {
  return await axiosClient.post(`/user/rv/add/${id}`).then(res => res.data);
};

export {
  signupUser,
  signinUser,
  logoutUser,
  authenticateUsingGmail,

  getCurrentUser,
  _updateUser,

  _addUserAddress,
  _updateUserAddress,
  _deleteUserAddress,
  _addToRecentlyViewed
};
