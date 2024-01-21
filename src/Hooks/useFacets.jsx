import { useQuery } from "@tanstack/react-query";
import { fetchFilterParams } from "../Services/product.api";

export default function useFacets() {
    const queryString = window.location.search.slice(1)

    const facets = useQuery(
        [
            'filterParams',
            queryString
        ],
        () => fetchFilterParams(queryString), {
        keepPreviousData: true
    })

    return {
        facets
    }
}