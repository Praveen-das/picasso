import axiosClient from "./axiosClient"

export const deleteImage = (fileId) => {
    return axiosClient.delete(`/imagekit/${fileId}`)
}

export const _addProduct = async (product) => {
    return await axiosClient.post(`/products/add`, product)
}

export const _deleteProduct = (id) => {
    return axiosClient.delete(`/products/${id}`)
}

export const _updateProduct = async ({ id, updates }) => {
    return await axiosClient.put(`/products/${id}`, updates)
}

export const fetchProducts = async (page, facets, orderBy, query, limit) => {
    return await axiosClient.request({
        url: '/products',
        params: {
            facets,
            o: orderBy,
            q: query,
            limit,
            p: page,
        }
    }).then(res => res.data)
}

export const productQuery = async (url, page, facets, orderBy, query, limit) => {
    return await axiosClient.request({
        url,
        params: {
            facets,
            o: orderBy,
            q: query,
            limit,
            p: page,
        }
    }).then(res => res.data)
}

export const fetchAdminProducts = (page, filter, query) => {
    const qPage = page && '&page=' + page
    const facets =
        filter.item !== null &&
            filter.value !== null ?
            `&facets[${filter.item}]=` + filter.value : ''

    return axiosClient.get(`/user/products?limit=10${qPage, query}&query=${query}`,).then(res => res.data)
}

export const fetchProduct = async (id) => {
    return await axiosClient.get(`/products/${id}`).then(res => res.data)
}

export const _getUserWishlist = async () => {
    return await axiosClient.get(`/user/wishlist`).then(res => res.data)
}

export const _addToWishlist = async (id) => {
    return axiosClient.post(`/user/wishlist/add/${id}`)
}

export const _removeFromWishlist = async (id) => {
    return axiosClient.delete(`/user/wishlist/remove/${id}`)
}
