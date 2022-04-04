import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../Context/FirebaseContext'
import ProductList from '../ProductList/ProductList'

function MyOrders() {
    const [data, setData] = useState()
    const { useDatabase } = useFirebase([])
    const { getData } = useDatabase([])

    useEffect(() => {
        getData('user_orders').then(data => setData(data))
    }, [getData])

    return (
        <>
            {
                data && data.map((product, index) =>
                    <ProductList key={index} product={product} />
                )
            }
        </>
    )
}

export default MyOrders
