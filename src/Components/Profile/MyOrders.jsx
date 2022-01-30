import React from 'react'
import { useFirebase } from '../../Context/FirebaseContext'
import ProductList from '../ProductList/ProductList'

function MyOrders() {
    const { userOrders } = useFirebase()

    return (
        <>
            {
                userOrders && userOrders.map((product, index) =>
                    <ProductList key={index} product={product} />
                )
            }
        </>
    )
}

export default MyOrders
