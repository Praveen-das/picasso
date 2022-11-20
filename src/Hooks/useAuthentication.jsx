import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  logoutUser,
  sendEmailVerification,
  signinUser,
  _addUserAddress,
  _updateUser,
} from "../lib/user.api";

function useAuthentication() {
  const queryClient = useQueryClient();

  const { mutateAsync: signin } = useMutation(signinUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const { data: currentUser } = useQuery(["currentUser"], getCurrentUser);

  const { mutate: logout } = useMutation(logoutUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const { mutateAsync: updateUser, isLoading } = useMutation(_updateUser, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const { mutateAsync: addUserAddress } = useMutation(_addUserAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  return {
    currentUser,
    signin,
    logout,
    updateUser,
    isLoading,
    addUserAddress,
  };
}

export default useAuthentication;
