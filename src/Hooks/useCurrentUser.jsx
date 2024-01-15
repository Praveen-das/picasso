import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  _addToRecentlyViewed,
  _addUserAddress,
  _deleteUserAddress,
  _updateUser,
  _updateUserAddress,
  _addSocialMediaLink,
  _removeSocialMediaLink,
} from "../lib/user.api";

function useCurrentUser() {
  const queryClient = useQueryClient();
  const currentUser = useQuery(["currentUser"], () => getCurrentUser());

  const updateUser = useMutation(_updateUser, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const addUserAddress = useMutation(_addUserAddress, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const updateUserAddress = useMutation(_updateUserAddress, {
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

  const addSocialMediaLink = useMutation(_addSocialMediaLink, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const removeSocialMediaLink = useMutation(_removeSocialMediaLink, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  return {
    currentUser,
    updateUser,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
    addToRecentlyViewed,
    addSocialMediaLink,
    removeSocialMediaLink
  }

}

export function useCurrentUserHelpers() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateUser, isLoading } = useMutation(_updateUser, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const addSocialMediaLink = useMutation(_addSocialMediaLink, {
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  return {
    updateUser,
    addSocialMediaLink
  }
}

export default useCurrentUser;
