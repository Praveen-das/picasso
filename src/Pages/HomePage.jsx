import React from 'react'
import Banner from '../Components/3dBanner/Banner'
import Header from '../Components/Header/Header'
import Navbar from '../Components/Navbar/Navbar'
import Section1 from '../Components/Section1/Section1'
import Tray from '../Components/Tray/Tray'
import './style.css'

function HomePage() {
    return (
        <div className='homePage'>
            <Header />
            {/* <Navbar />   */}
            <Banner />
            <Section1/>
            {/* <Tray title='Latest works'/> */}
        </div>
    )
}

export default HomePage
