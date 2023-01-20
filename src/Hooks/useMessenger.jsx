import { useQuery } from "@tanstack/react-query";

export const useOnlineUsers = () => {
    return useQuery(['online_users'], () => '');
}