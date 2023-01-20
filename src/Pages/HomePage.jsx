import Banner from '../Components/Banner/Banner'
import Header from '../Components/Header/Header'
import Categories from '../Components/Categories/Categories'

import './style.css'
import { ScrollRestoration } from 'react-router-dom'
import Tray from '../Components/Tray/Tray'

function HomePage() {
    return (
        <>
            <ScrollRestoration />
            <Header />
            <Banner />
            <Categories />
            <Tray title='FEATURED PRODUCTS' url='products/popular?limit=5' />
            <Tray title='NEW ARRIVALS' url='products/latest?limit=5' />
        </>
    )
}

export default HomePage
