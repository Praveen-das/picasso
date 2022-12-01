import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    _addToCart,
    _clearCart,
    _fetchUserCart,
    _updateCart,
    _removeFromCart,
} from "../lib/cart.api";

export const useCart = (userId) => {

    const queryClient = useQueryClient()

    const addToCart = useMutation(_addToCart, {
        onSuccess: () => {
            queryClient.invalidateQueries(['cart'])
        }
    })

    const removeFromCart = useMutation(_removeFromCart, {
        onSuccess: () => {
            queryClient.invalidateQueries(['cart'])
        }
    })

    const clearCart = useMutation(_clearCart, {
        onSuccess: () => {
            queryClient.invalidateQueries(['cart'])
        }
    })

    const updateCart = useMutation(_updateCart, {
        onSuccess: () => {
            queryClient.invalidateQueries(['cart'])
        }
    })

    const cart = useQuery(['cart'], _fetchUserCart, { enabled: !!userId })

    return {
        addToCart,
        removeFromCart,
        cart,
        clearCart,
        updateCart
    }
}