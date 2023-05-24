import axiosClient from "./axiosClient";

const signupUser = async (credentials) => {
  return await axiosClient.post("/user/signup", credentials).then(res => res.data);
};

const signinUser = async (credentials) => {
  const data = await axiosClient.post("/user/signin", credentials);
  console.log(data.headers.get('set-cookie'));
  return data
};

const logoutUser = async () => {
  return await axiosClient.get("/user/logout");
};

const _updateUser = async (updates) => {
  return await axiosClient.put("/user/update", updates);
};

const getCurrentUser = async () => {
  // let id = sessionStorage.getItem('user_id')

  // if (!id) {
  //   id = crypto.randomUUID()
  //   sessionStorage.setItem('user_id', id)
  // }
  // return await axiosClient.get("/user").then(({ data }) => data || null)
  return await axiosClient.get("/api/product").then(({ data }) => data || null)
};

const _getUserById = async (uid) => {
  return await axiosClient.get(`/user/${uid}`).then(({ data }) => data || null)
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

const _addSocialMediaLink = async (data) => {
  return await axiosClient.post(`/user/social`, data).then(res => res.data);
};
const _removeSocialMediaLink = async (id) => {
  return await axiosClient.delete(`/user/social/${id}`).then(res => res.data);
};

export {
  signupUser,
  signinUser,
  logoutUser,
  authenticateUsingGmail,

  getCurrentUser,
  _getUserById,
  _updateUser,

  _addUserAddress,
  _updateUserAddress,
  _deleteUserAddress,
  _addToRecentlyViewed,

  _addSocialMediaLink,
  _removeSocialMediaLink
};
