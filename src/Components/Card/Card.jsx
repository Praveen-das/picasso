import React, { useState } from 'react'
import favourite_normal from '../../Assets/Icons/favourite-normal.svg'
import favourite_active from '../../Assets/Icons/favourite-active.svg'
import './card.css'
import { Link } from 'react-router-dom'
import { useStore } from '../../Context/Store'
import { useDatabase } from '../../Hooks/useDatabase'

function Card({ product, lastItem }) {
    const [imageProperties, setImageProperties] = useState()
    const userData = useStore(state => state.userData)

    const { addToWishlist, removeFromWishlist } = useDatabase()

    const getImageProperties = (e) => {
        let width = e.target.naturalWidth
        let height = e.target.naturalHeight
        let clientHeight = e.target.clientHeight
        let aspectRatio = width / height

        if (lastItem)
            return setImageProperties({ maxWidth: `${aspectRatio * clientHeight}px` })
        setImageProperties({ maxWidth: `calc(${aspectRatio * clientHeight}px + 100px)` })
        // if (aspectRatio < 1)
        // if (aspectRatio >= 1)
        //     setImageProperties({ maxWidth: `calc(${aspectRatio * clientHeight}px + 50px)` })
        // if (aspectRatio < 1)
        //     return setImageProperties({ maxWidth: `calc(${aspectRatio * clientHeight}px )` })
        // if (aspectRatio === 1)
        //     return setImageProperties({ maxWidth: `calc(${aspectRatio * clientHeight}px )` })
        // setImageProperties({ maxWidth: `calc(${aspectRatio * clientHeight}px + 5% )` })

    }

    return (
        <Link className='product_card' style={imageProperties} to='/shop/product' state={product}>
            <label className='product_name' htmlFor="">Monroe in color</label>
            <label className='product_artist' htmlFor="">John doe</label>
            <img onLoad={(e) => getImageProperties(e)} className='painting' src={product.image[product.defaultImage] + '/tr:w-200'} alt="" />
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
