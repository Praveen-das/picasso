import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProduct, fetchAdminProducts, fetchProducts, _addProduct, _updateProduct, _deleteProduct, productQuery } from "../lib/product.api";
import { useFilter } from "../Components/Sidebar/useFilter";


export function useProducts() {
    const queryString = window.location.search.slice(1)

    return useQuery(
        [
            'products',
            queryString
        ],
        () => fetchProducts(
            queryString
        ),
        {
            keepPreviousData: true
        }
    )
}

export function useProductQuery(queryKey, url) {
    return useQuery([queryKey,url], () => productQuery(url), {
        keepPreviousData: true,
    })
}

export function useSellerProducts(id) {

}

export function useAdmin() {
    const queryString = window.location.search.slice(1)
    const queryClient = useQueryClient();

    const products = useQuery(['admin_products', queryString], () => fetchAdminProducts(queryString), { keepPreviousData: true })

    const addProduct = useMutation(_addProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries(["admin_products"]);
        }
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

    return {
        products,
        addProduct,
        deleteProduct,
        updateProduct,
    }
}

export function useProduct(id) {
    const data = useQuery(['product', id], () => fetchProduct(id), {
        enabled: !!id,
        // suspense: true
    })
    
    return data
}
