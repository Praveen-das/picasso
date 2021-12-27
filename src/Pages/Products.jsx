import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Tray from '../Components/ProductsTray/Tray'

function Products() {
    return (
        <div id='wrapper'>
            <Header/>
            <Tray/>
            <Footer/>
        </div>
    )
}

export default Products
