
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

export const fetchProducts = (page, filter, query) => {
    const qPage = page && '&page=' + page
    const facets =
        filter.item !== null &&
            filter.value !== null ?
            `&facets[${filter.item}]=` + filter.value : ''
            
    const q = query !== '' ? `&q[name][search]=${query}` : ''

    return axiosClient.get(`/products?limit=10${qPage, q}`,)
}

export const fetchProduct = (id) => {
    return axiosClient.get(`/ products / ${id} `)
}
