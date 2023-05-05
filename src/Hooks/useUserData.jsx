import { useQuery } from "@tanstack/react-query";
import { _getUserById } from "../lib/user.api";

function useUserData(uid) {
    const user = useQuery(["user", uid], () => _getUserById(uid), {
        enabled: !!uid
    });


    return {
        user
    }
}

export default useUserData