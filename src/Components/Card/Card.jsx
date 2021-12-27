import React, { useEffect, useState } from 'react'
import stars from '../../Assets/Icons/stars.png'
import favourite_normal from '../../Assets/Icons/favourite-normal.svg'
import favourite_active from '../../Assets/Icons/favourite-active.svg'
import './card.css'

function Card({ product }) {
    const [favourite, setFavourite] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [isDisabled, setIsDisabled] = useState(false)

    const handleFavourite = () => {
        console.log(favourite);
        if (!favourite)
            return setFavourite(true)
        return setFavourite(false)
    }

    const handleQuantity = (action) => {
        let value = parseInt(quantity)
        if (action === 'increase') {
            if (value === 10) return
            setIsDisabled(false)
            return setQuantity(value + 1)
        }
        if (action === 'decrease')
            if (value === 1)
                return setIsDisabled(true)
        return setQuantity(value - 1)
    }

    useEffect(() => {
        console.log(quantity);
    }, [quantity])

    return (
        <div className="card">
            <img className='product-image' src={product} alt="" />
            <div className="product-details">
                <label className='product-title' htmlFor="">Lorem, ipsum.</label>
                <label className='product-size' htmlFor="">132x566.</label>
                <label className='product-category' htmlFor="">Saree painting.</label>
                <img className='stars' src={stars} alt="" />
                <label className='product-price' htmlFor="">12000 Rs</label>
                <div className='product-qty' htmlFor="">
                    <button disabled={isDisabled} onClick={() => handleQuantity('decrease')} className='decrease'>-</button>
                    <input
                        className='product-qty-input'
                        value={quantity}
                        onChange={(e) => {
                            if (e.target.value > 10) return
                            setQuantity(e.target.value)
                        }}
                        type="tel" />
                    <button onClick={() => handleQuantity('increase')} className='increase'>+</button>
                </div>
                <label className='product-buyNow' htmlFor="">Buy Now</label>
                <label className='product-addToCart' htmlFor="">Add to cart</label>
                <div className="favourite-wrapper">
                    <img
                        onClick={handleFavourite}
                        className='favourite'
                        src={
                            !favourite ? favourite_normal : favourite_active
                        }
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default Card
