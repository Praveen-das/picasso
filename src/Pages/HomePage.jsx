import './style.css'
import { ScrollRestoration } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import Banner from '../Components/Banner/Banner'

const Tray = lazy(() => import('../Components/Tray/Tray'))

function HomePage() {
    return (
        <>
            <ScrollRestoration />
            <Banner />
            <Suspense fallback='asdadasdasdasdasdasd'>
                <Tray title='FEATURED PRODUCTS' url='products/popular?limit=5' />
                <Tray title='NEW ARRIVALS' url='products/latest?limit=5' />
            </Suspense>
        </>
    )
}

export default HomePage
