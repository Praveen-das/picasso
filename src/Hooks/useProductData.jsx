import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProduct, fetchProducts } from "../lib/product.api";

export function useProductData() {
    const [page, setPage] = useState(1)
    const query = useQuery(['products', page], () => fetchProducts(page))
    query.page = setPage
    return query
}

export function useProduct(id) {
    return useQuery(['product', id], () => fetchProduct(id), { enabled: !!id })
}


