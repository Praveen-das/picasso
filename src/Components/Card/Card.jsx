import react, { useState } from 'react'
import favourite_normal from '../../Assets/Icons/favourite-normal.svg'
import favourite_active from '../../Assets/Icons/favourite-active.svg'
import './card.css'
import { Link } from 'react-router-dom'
import { useStore } from '../../Context/Store'
import { useDatabase } from '../../Hooks/useDatabase'

function Card({ product, height }) {
    const userData = useStore(state => state.userData)

    const { addToWishlist, removeFromWishlist } = useDatabase()

    return (
        <Link className='product_card' style={{ height }} to='/shop/product' state={product}>
            <label className='product_name' htmlFor="">Monroe in color</label>
            <label className='product_artist' htmlFor="">John doe</label>
            <img className='painting' src={product.image[product.defaultImage] + '/tr:w-200'} alt="" />
            <div className="product_card--actions">
                <div className="favourite-wrapper">
                    {
                        userData?.wishlist?.filter((o) => o === product.id)[0] ?
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
            {/* </div> */}
            {/* <img className='product-image' src={product.image[product.defaultImage] + '/tr:w-500'} alt="" />
            <div className="product-details">
                <label className='product-title' htmlFor="">{product.name}</label>
            </div> */}
        </Link>
    )
}

export default Card
