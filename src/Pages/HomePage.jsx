import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner/Banner'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Categories from '../Components/Categories/Categories'

import './style.css'
import { useStore } from '../Context/Store'

function HomePage() {
    async function fetchData() {
        let data = await fetch('http://localhost:3001/products',{method:'get'}).then(res => res.json())
        console.log(data);
    }

    return (
        <>
            <button style={{ position: 'fixed', zIndex: 22222 }} onClick={() => fetchData()}>FETCH DATA</button>
            <Header />
            <Banner />
            {/* <AboutUs /> */}
            <Categories />
            {/* <div className="category1">
                <Tray more height={400} data={data} from='110%' to='-50%' parent='category1' title='NEW ARRIVALS' />
            </div>
            <div className="category2">
                <Tray more height={400} data={data} from='-130%' to='10%' parent='category2' title='BEST SELLING' />
            </div> */}
            {/* <Footer /> */}
        </>
    )
}

export default HomePage
