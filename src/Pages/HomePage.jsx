import React from 'react'
import Banner from '../Components/Banner/Banner'
import Artists from '../Components/Artists/Artists'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Section1 from '../Components/Section1/Section1'
import Tiles from '../Components/Tiles/Tiles'
import TrayMaterials from '../Components/Tray/Tray'
import Tray from '../Components/ProductsTray/Tray'

import './style.css'

function HomePage() {
    return (
        <>
            <Header />
            <Banner />
            {/* <Tiles /> */}
            {/* <TrayMaterials /> */}
            {/* <div className="category1">
                <Tray from='110%' to='-25%' parent='category1' title='NEW ARRIVALS' />
            </div>
            <div className="category2">
                <Tray from='-150%' to='0%' parent='category2' title='BEST SELLING' />
            </div> */}
            {/* <Section1 /> */}
            {/* <Artists /> */}
            {/* <Footer /> */}
        </>
    )
}

export default HomePage
