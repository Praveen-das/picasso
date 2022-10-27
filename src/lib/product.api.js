
// import 

import axiosClient from "./axiosClient"

export const deleteImage = (fileId) => {
    return axiosClient.delete(`/imagekit/${fileId}`)
}

export const addProduct = (product) => {
    return axiosClient.post(`/products`, product)
}

export const deleteProduct = (id) => {
    return axiosClient.delete(`/products/${id}`)
}

export const updateProduct = (id, updates) => {
    return axiosClient.put(`/products/${id}`, updates)
}

export const fetchProducts = ({ page=1 }) => {
    return axiosClient.get(`/products?limit=10&page=${page}`,)
}

export const fetchProduct = (id) => {
    return axiosClient.get(`/products/${id}`)
}
