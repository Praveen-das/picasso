import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  logoutUser,
  signinUser,
  signupUser,
} from "../lib/user.api";

function useAuth() {
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

  return {
    signin,
    signup,
    logout,
  };
}

export default useAuth;
