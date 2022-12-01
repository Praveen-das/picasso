import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  logoutUser,
  signinUser,
  signupUser,
  _updateUser,
} from "../lib/user.api";

function useAuthentication() {
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

  const { mutate: logout } = useMutation(logoutUser, {
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

export default useAuthentication;
