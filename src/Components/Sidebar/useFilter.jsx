import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

function parseJSON(json) {
    let parsed = json
    try {
        parsed = JSON.parse(json)
    } catch (error) { }
    return parsed
}

export function useFilter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryString = searchParams.toString()

    let filter = useMemo(() => {
        let facets = []
        for (let [key, value] of searchParams.entries()) {
            key = key.replace('[]', '')
            value = parseJSON(value)

            if (key === 'priceRange') {
                facets.unshift({ item: key, value, label: `₹${value?.min} - ₹${value?.max}` })
                continue
            }
            if (key === 'rating') {
                facets.unshift({ item: key, value, label: `${value} & above` })
                continue
            }
            if (key === 'orderBy') {
                facets.unshift({ item: key, value })
                continue
            }
            facets.unshift({ item: key, value, label: value })
        }
        return facets
    }, [searchParams]);


    const setFilter = (key, value, merge) => {
        if (typeof value == 'object')
            value = JSON.stringify(value)

        if (filter?.some((item) => item.value === value)) {
            let newSearchParams = new URLSearchParams()
            for (let [k, v] of searchParams.entries()) {
                v = parseJSON(v)
                if (value === v) continue

                newSearchParams.append(k, v)
            }
            setSearchParams(newSearchParams)
            return
        }

        if (merge) {
            setSearchParams(q => {
                q.set(key, value)
                return q
            });
            return
        }
        setSearchParams(pre => {
            pre.append(key + '[]', value)
            return pre
        });
    };

    const deleteFilter = (key) => {
        setSearchParams(p => {
            p.delete(key)
            return p
        })
    }

    return {
        queryString,
        filter,
        setFilter,
        deleteFilter
    };
}