import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  _addToRecentlyViewed,
  _addUserAddress,
  _deleteUserAddress,
  _updateUser,
  _updateUserAddress,
} from "../lib/user.api";
import { useMemo } from "react";

// function useUserDetails

function useCurrentUser() {
  const queryClient = useQueryClient();
  const currentUser = useQuery(["currentUser"], () => getCurrentUser());

  const { mutateAsync: updateUser, isLoading } = useMutation(_updateUser, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const { mutateAsync: addUserAddress } = useMutation(_addUserAddress, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const { mutateAsync: updateUserAddress } = useMutation(_updateUserAddress, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const { mutateAsync: deleteUserAddress } = useMutation(_deleteUserAddress, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const addToRecentlyViewed = useMutation(_addToRecentlyViewed, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  return useMemo(() => ({
    currentUser,
    updateUser,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
    isLoading,
    addToRecentlyViewed
  }), [
    currentUser,
    updateUser,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
    isLoading,
    addToRecentlyViewed
  ])

}

export default useCurrentUser;
