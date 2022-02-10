import React from 'react'
import Banner from '../Components/3dBanner/Banner'
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
            {/* <Tiles />
            <Tray/>
            <TrayMaterials />
            <Section1 />
            <Artists/>
            <Footer/> */}
        </>
    )
}

export default HomePage
