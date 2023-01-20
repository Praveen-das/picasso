import axiosClient from "./axiosClient"

const _addToCart = async (payload) => {
    return await axiosClient.post('/cart', payload).then(res => res.data)
}

const _removeFromCart = async (cart_id) => {
    return await axiosClient.delete(`/cart/delete/${cart_id}`)
}

const _updateCart = async ({ id, quantity, price }) => {
    return await axiosClient.put(`/cart/update/${id}`, { quantity, price })
}

const _clearCart = async () => {
    return await axiosClient.delete(`/cart/clear`)
}

const _fetchUserCart = async () => await axiosClient.get('/cart').then(res => res.data)

export {
    _fetchUserCart,
    _addToCart,
    _removeFromCart,
    _updateCart,
    _clearCart
}