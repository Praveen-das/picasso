import { ScrollRestoration } from 'react-router-dom'
import Header from '../Components/Header/Header'
import ProductInfo from '../Components/Product/ProductInfo'
import Product from '../Components/Product/Product'

function ProductPage() {

    return (
        <>
            <ScrollRestoration />
            <Header />
            {/* <ProductInfo /> */}
            <Product />
        </>
    )
}

export default ProductPage
