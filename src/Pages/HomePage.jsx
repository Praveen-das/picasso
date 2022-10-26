import react from 'react'
import Banner from '../Components/Banner/Banner'
import Header from '../Components/Header/Header'
import Categories from '../Components/Categories/Categories'

import './style.css'

function HomePage() {
    return (
        <>
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
