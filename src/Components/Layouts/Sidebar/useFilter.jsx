import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

function parseJSON(json) {
    let parsed = json
    try {
        parsed = JSON.parse(json)
    } catch (error) { }
    return parsed
}

const searchOptions = { replace: true }

export function useFilter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryString = searchParams.toString()

    let filter = useMemo(() => {
        let facets = []
        for (let [key, value] of searchParams.entries()) {
            key = key.replace('[]', '')
            value = parseJSON(value)
            
            if (key === 'price_range') {
                let label
                if (value?.min && value?.max)
                    label = `₹ ${value?.min} - ₹ ${value?.max}`
                if (!value?.min)
                    label = `Under ₹ ${value?.max}`
                if (!value?.max)
                    label = `Above ₹ ${value?.min}`

                facets.unshift({ item: key, value, label })
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


    const setFilter = (key, value, replace) => {
        //serialize objects
        if (typeof value == 'object')
            value = JSON.stringify(value)

        //remove value if already exists
        if (filter?.some((item) => item.value === value)) {
            let newSearchParams = new URLSearchParams()

            for (let [k, v] of searchParams.entries()) {
                let parsed = parseJSON(v)
                if (value === parsed) continue

                newSearchParams.append(k, v)
            }
            setSearchParams(newSearchParams, searchOptions)
            return
        }

        //replace value if true
        if (replace) {
            setSearchParams(q => {
                q.set(key, value)
                return q
            }, searchOptions);
            return
        }

        //stack values
        setSearchParams(pre => {
            pre.append(key + '[]', value)
            return pre
        }, searchOptions);
    };

    const deleteFilter = (key) => {
        setSearchParams(p => {
            p.delete(key)
            return p
        }, searchOptions)
    }

    return {
        queryString,
        filter,
        setFilter,
        deleteFilter
    };
}