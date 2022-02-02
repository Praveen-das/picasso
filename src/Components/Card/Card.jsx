import React, { useEffect } from 'react'
import favourite_normal from '../../Assets/Icons/favourite-normal.svg'
import favourite_active from '../../Assets/Icons/favourite-active.svg'
import './card.css'
import { useFirebase } from '../../Context/FirebaseContext'
import { Link } from 'react-router-dom'

function Card({ product }) {
    const { addToWishlist, removeFromWishlist, userData } = useFirebase()

    return (
        <Link to='/shop/product' state={product} className="card">
            <img className='product-image' src={product.image[product.defaultImage]} alt="" />
            <div className="product-details">
                <label className='product-title' htmlFor="">{product.name}</label>
                <div className="favourite-wrapper">
                    {
                        userData && userData.wishlist &&
                            userData.wishlist.filter((o) => o === product.id)[0] ?
                            <img
                                onClick={(e) => {
                                    e.preventDefault()
                                    removeFromWishlist(product.id)
                                }}
                                className='favourite'
                                src={favourite_active}
                                alt=""
                            /> :
                            <img
                                onClick={(e) => {
                                    e.preventDefault()
                                    addToWishlist(product.id)
                                }}
                                className='favourite'
                                src={favourite_normal}
                                alt=""
                            />
                    }
                </div>
            </div>
        </Link>
    )
}

export default Card
