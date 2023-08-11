import './style.css'
import { ScrollRestoration } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import Banner from '../Components/Banner/Banner'
import Explore from '../Components/ExploreBar/Explore'
import useFacets from '../Hooks/useFacets'
import SellerSection from '../Components/Seller/SellerSection'

const Tray = lazy(() => import('../Components/Tray/Tray'))

function HomePage() {
    const { facets: { data } } = useFacets()
    const categories = data?.categories || []

    const filters = [
        'New Arrivals',
        'Best Selling',
    ]

    return (
        <div>
            <ScrollRestoration />
            <Banner />
            <Suspense >
                <Explore />
                <Tray
                    title='CURATED COLLECTIONS'
                    url='products/popular?limit=5'
                    filters={filters}
                />
                <SellerSection />
            </Suspense>
        </div>
    )
}

export default HomePage
