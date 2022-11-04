import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProduct, fetchProducts } from "../lib/product.api";

export function useProductData() {
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({ item: null, value: null })
    const [query, setQuery] = useState('')

    const products = useQuery(['products', page], () => fetchProducts(page, filter, query))
    products.page = setPage
    products.filter = setFilter
    products.query = setQuery
    
    return products
}

export function useProduct(id) {
    const data = useQuery(['product', id], () => fetchProduct(id), {
        enabled: !!id,
    })
    return data
}


