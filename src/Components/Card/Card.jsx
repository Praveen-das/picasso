import React, { useEffect } from 'react'
import favourite_normal from '../../Assets/Icons/favourite-normal.svg'
import favourite_active from '../../Assets/Icons/favourite-active.svg'
import './card.css'
import { useFirebase } from '../../Context/FirebaseContext'
import { Link } from 'react-router-dom'

function Card({ product }) {
    const { addToWishlist, removeFromWishlist, userData } = useFirebase()

    return (
        <Link to='/shop/product' state={product}>
            <div className='product_card'>
                <label className='product_name' htmlFor="">Monroe in color</label>
                <label className='product_artist' htmlFor="">John doe</label>
                <img className='painting' src={product.image[product.defaultImage] + '/tr:w-700'} alt="" />
                <div className="product_card--actions">
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
                    <label htmlFor="">VIEW ARTWORK</label>
                </div>
            </div>
            {/* <img className='product-image' src={product.image[product.defaultImage]+'/tr:w-500'} alt="" />
            <div className="product-details">
                <label className='product-title' htmlFor="">{product.name}</label>
            </div> */}
        </Link>
    )
}

export default Card
