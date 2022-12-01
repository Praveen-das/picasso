import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  _addUserAddress,
  _deleteUserAddress,
  _updateUser,
  _updateUserAddress,
} from "../lib/user.api";

function useUserData() {
  const queryClient = useQueryClient();

  const currentUser = useQuery(["currentUser"], getCurrentUser);

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

  const { mutateAsync: updateUserAddress } = useMutation(_updateUserAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const { mutateAsync: deleteUserAddress } = useMutation(_deleteUserAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  return {
    currentUser,
    updateUser,

    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
    isLoading,
  };
}

export default useUserData;
