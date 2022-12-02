import axiosClient from "./axiosClient"

const _getProductReview = async (id) => {
    return await axiosClient.get(`/reviews/${id}`).then(res => res.data)
}

const addUserReview = async (data) => {
    return await axiosClient.post('/reviews/add', data)
}

const deleteUserReview = async (review_id) => {
    return await axiosClient.delete(`/reviews/delete/${review_id}`)
}

const updateUserReview = async ({ review_id, updates }) => {
    return await axiosClient.put(`/reviews/update/${review_id}`, updates)
}

export default {
    _getProductReview,
    addUserReview,
    deleteUserReview,
    updateUserReview
}