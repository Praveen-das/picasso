
// import 

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

export const fetchProducts = async (page, filter, query) => {
    const qPage = page && '&page=' + page
    const facets =
        filter.item !== null &&
            filter.value !== null ?
            `&facets[${filter.item}]=` + filter.value : ''

    return await axiosClient.get(`/products`).then(res => res.data)
}

export const fetchAdminProducts = (page, filter, query) => {
    const qPage = page && '&page=' + page
    const facets =
        filter.item !== null &&
            filter.value !== null ?
            `&facets[${filter.item}]=` + filter.value : ''

    return axiosClient.get(`/user/products?limit=10${qPage, query}&query=${query}`,).then(res => res.data)
}

export const fetchProduct = (id) => {
    return axiosClient.get(`/ products / ${id} `)
}
