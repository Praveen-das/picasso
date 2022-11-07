import React from "react";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import Login from "../Components/Login/Login";
import useAuthentication from "../Hooks/useAuthentication";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuthentication();
  const navigate = useNavigate();

  if (!currentUser) return <Login model callback={() => navigate("/")}/>;

  return children;
}
