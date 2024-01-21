import axiosClient from "../lib/axiosClient";

const _createSalesOrder = async (payload) => {
    return await axiosClient.post("/orders/create", payload);
};

const _updateStatus = async ({ id, status }) => {
    return await axiosClient.put(`/orders/${id}`, { status });
};

const _getSalesOrderByUserId = async (filter) => {
    return await axiosClient.get(`/orders/sales${filter && '?q='}${filter}`).then(res => res.data)
};

const _getOrdersByUserId = async () => {
    return await axiosClient.get("/orders").then(res => res.data)
};

export {
    _createSalesOrder,
    _updateStatus,
    _getSalesOrderByUserId,
    _getOrdersByUserId
}
