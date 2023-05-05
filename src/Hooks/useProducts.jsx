import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchProduct, fetchAdminProducts, fetchProducts, _addProduct, _updateProduct, _deleteProduct, productQuery } from "../lib/product.api";

Array.prototype.groupItems = function () {
    return this.reduce((prev, cur) => {
        const key = cur.item
        for (let k in prev)
            if (k === key) return prev[key].push(cur.value) && prev
        prev[key] = [cur.value]
        return prev
    }, {})
}

export function useProducts() {
    let { state } = useLocation()
    const { id: seller_id } = useParams()

    const facets = state?.filter?.groupItems() || {}
    if (seller_id) Object.assign(facets, { seller_id })

    return useQuery(
        [
            'products',
            state?.page,
            facets,
            state?.orderBy,
            state?.query,
            state?.limit
        ],
        () => fetchProducts(
            state?.page,
            facets,
            state?.orderBy,
            state?.query,
            state?.limit
        ),
        {
            keepPreviousData: true,
        }
    )
}

export function useProductQuery(queryKey, url, state) {
    // const facets = state?.filter?.groupItems()
    return useQuery([queryKey], () => productQuery(url), {
        keepPreviousData: true,
    })
}

export function useSellerProducts(id) {

}

export function useAdmin(id) {
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

    return {
        products,
        setPage,
        setFilter,
        setQuery,
        addProduct,
        deleteProduct,
        updateProduct,

    }
}

export function useProduct(id) {
    const data = useQuery(['product', id], () => fetchProduct(id), {
        enabled: !!id,
    })

    return data
}