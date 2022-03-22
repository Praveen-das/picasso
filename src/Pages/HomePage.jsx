import React from 'react'
import Banner from '../Components/Banner/Banner'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Categories from '../Components/Categories/Categories'
import Tray from '../Components/ProductsTray/Tray'

import './style.css'
import AboutUs from '../Components/AboutUs/AboutUs'
import { useFirebase } from '../Context/FirebaseContext'

function HomePage() {
    const { allProducts } = useFirebase()
    return (
        <>
            <Header />
            <Banner />
            <AboutUs/>
            <Categories />
            <div className="category1">
                <Tray more height={400} data={allProducts} from='110%' to='-50%' parent='category1' title='NEW ARRIVALS' />
            </div>
            <div className="category2">
                <Tray more height={400} data={allProducts} from='-130%' to='10%' parent='category2' title='BEST SELLING' />
            </div>
            <Footer />
        </>
    )
}

export default HomePage
