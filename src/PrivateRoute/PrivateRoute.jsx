import React from "react";
import { Navigate, Outlet, Route, useNavigate, redirect } from "react-router-dom";
import Login from "../Components/Login/Login";
import useUserData from "../Hooks/useUserData";

export default function PrivateRoute({ children }) {
  const { currentUser } = useUserData();
  const navigate = useNavigate();

  if (!currentUser.data) return <Login model callback={() => navigate(-1)} />;

  return children;
}
