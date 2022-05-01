import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner/Banner'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'

import './style.css'
import { useStore } from '../Context/Store'

function HomePage() {
    const getDataFromDB = useStore(state => state.getDataFromDB)
    const [data, setData] = useState([])

    useEffect(() => {
        getDataFromDB('allProducts', undefined).then((res) => {
            setData(res?.data);
        })
    }, [getDataFromDB])

    return (
        data.length === 0 ? <></> :
            <>
                <Header />
                <Banner data={data} />
                {/* <AboutUs />
            <Categories /> */}
                {/* <div className="category1">
                <Tray more height={400} data={data} from='110%' to='-50%' parent='category1' title='NEW ARRIVALS' />
            </div>
            <div className="category2">
                <Tray more height={400} data={data} from='-130%' to='10%' parent='category2' title='BEST SELLING' />
            </div> */}
                <Footer />
            </>
    )
}

export default HomePage
