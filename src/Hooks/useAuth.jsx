import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  logoutUser,
  signinUser,
  signupUser,
} from "../lib/user.api";
import socket from "../lib/ws";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const navigate = useNavigate()

  const queryClient = useQueryClient();

  const { mutateAsync: signin } = useMutation(signinUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const { mutateAsync: signup } = useMutation(signupUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const logout = useMutation(logoutUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  function handleLogout() {
    logout.mutateAsync()
      .then(() => {
        socket.disconnect()
      })
      .finally(() => {
        navigate('/')
      })

  }

  return {
    signin,
    signup,
    logout,
    handleLogout
  };
}

export default useAuth;
