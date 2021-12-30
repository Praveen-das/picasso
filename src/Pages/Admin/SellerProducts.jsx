import React from 'react'
import Navbar from '../../Components/Admin/Navbar/Navbar'
import Products from '../../Components/Admin/Products/Products'

function AddProducts() {
    return (
        <div className='admin-wrapper'>
            <Navbar/>
            <Products/>
        </div>
    )
}

export default AddProducts
