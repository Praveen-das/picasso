import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProduct, fetchAdminProducts, fetchProducts, _addProduct, _updateProduct, _deleteProduct } from "../lib/product.api";

export function useProducts() {
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({ item: null, value: null })
    const [query, setQuery] = useState('')

    const products = useQuery(['products', page], () => fetchProducts(page, filter, query))

    return { products, setPage, setFilter, setQuery }
}

export function useAdmin() {
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({ item: null, value: null })
    const [query, setQuery] = useState('')

    const products = useQuery(['admin_products', page], () => fetchAdminProducts(page, filter, query))
    
    const addProduct = useMutation(_addProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries(["admin_products"]);
        },
    });

    const updateProduct = useMutation(_updateProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries(["admin_products"]);
        },
    });

    const deleteProduct = useMutation(_deleteProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries(['admin_products'])
        },
    })

    return { products, setPage, setFilter, setQuery, addProduct, deleteProduct, updateProduct }
}

export function useProduct(id) {
    const data = useQuery(['product', id], () => fetchProduct(id), {
        enabled: !!id,
    })

    return data
}