import React from 'react'
import image from '../../Assets/Images/painting.jpg'
import stars from '../../Assets/Icons/stars.png'
import './card.css'

function Card() {
    return (
            <div className="card">
                <img className='product-image' src={image} alt="" />
                <div className="product-details">
                    <label className='product-title' htmlFor="">Lorem, ipsum.</label>
                    <label className='product-size' htmlFor="">132x566.</label>
                    <img className='stars' src={stars} alt="" />
                </div>
            </div>
    )
}

export default Card
