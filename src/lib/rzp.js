import axiosClient from "./axiosClient";

export const _verifyPayment = (data) => axiosClient.post('/rzp/verify', data)

export const createLinkedAccount = async (payload) => {
    return await axiosClient.post('/rzp/accounts', payload)
}

export const getLinkedAccounts = async () => {
    return await axiosClient.get('/rzp/accounts').then(res => res.data)
}