import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Components/Login/Login";

export default function LoginPrompt() {
  const navigate = useNavigate();
  return <Login model callback={() => navigate('/')} />;
}
