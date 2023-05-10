import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { _addToWishlist, _removeFromWishlist, _getUserWishlist } from "../lib/product.api";

function useWishlist() {
    const queryClient = useQueryClient();

    const wishlists = useQuery(['wishlist'], _getUserWishlist)

    const addToWishlist = useMutation(_addToWishlist, {
        onSuccess: () => {
            queryClient.invalidateQueries(['wishlist'])
        },
    })

    const removeFromWishlist = useMutation(_removeFromWishlist, {
        onSuccess: () => {
            queryClient.invalidateQueries(['wishlist'])
        },
    })
    
    return {
        wishlists,
        addToWishlist,
        removeFromWishlist
    }
}

export default useWishlist