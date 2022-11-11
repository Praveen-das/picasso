import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  logoutUser,
  sendEmailVerification,
  signinUser,
  updateUser,
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

  const { mutateAsync: update, isLoading: isUpdating } = useMutation(
    updateUser,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["currentUser"]);
      },
    }
  );

  const { mutateAsync: sendEmailVerificationAndUpdate } = useMutation(
    sendEmailVerification,
    {
      onMutate: () => {
        queryClient.invalidateQueries(["currentUser"]);
      },
    }
  );

  return {
    currentUser,
    signin,
    logout,
    update,
    isUpdating,
  };
}

export default useAuthentication;
