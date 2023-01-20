import { ScrollRestoration } from 'react-router-dom'
import BreadCrumb from '../Components/Breadcrumbs/BreadCrumbs'
import Header from '../Components/Header/Header'
import Product from '../Components/Product/Product'

function ProductPage() {

    return (
        <>
            <ScrollRestoration />
            <Header />
            <Product />
        </>
    )
}

export default ProductPage
