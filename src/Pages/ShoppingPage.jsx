import react from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Shop from '../Components/Shop/Shop'
import { ScrollRestoration } from 'react-router-dom'


function Products() {
    
    return (
        <div id='wrapper'>
            <ScrollRestoration/>
            <Header/>
            <Shop/>
            <Footer/>
        </div>
    )
}

export default Products
