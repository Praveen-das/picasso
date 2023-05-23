import { ScrollRestoration } from 'react-router-dom'
import Product from '../Components/Product/Product'

function ProductPage() {

    return (
        <>
            <ScrollRestoration />
            <Product />
        </>
    )
}

export default ProductPage
