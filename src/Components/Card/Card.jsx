import react, { useState } from 'react'
import favourite_normal from '../../Assets/Icons/favourite-normal.svg'
import favourite_active from '../../Assets/Icons/favourite-active.svg'
import './card.css'
import { Link, useNavigate } from 'react-router-dom'
import useWishlist from '../../Hooks/useWishlist'
import useCurrentUser from '../../Hooks/useCurrentUser'
import { useEffect } from 'react'

function Card({ product, sx }) {
    const [wishlist, setWishlist] = useState(null)

    const {
        wishlists,
        addToWishlist,
        removeFromWishlist
    } = useWishlist()

    const { currentUser } = useCurrentUser()
    const navigate = useNavigate()

    useEffect(() => {
        setWishlist(wishlists.data?.find(({ product_id }) => product_id === product.id))
    }, [wishlists])

    const images = product?.images
    const defaultImage = images?.find((o) => o.fileId === product.defaultImage)

    return (
        <Link style={{ position: 'relative', display: 'inline-block' }} to={`/shop/product/${product?.id}`}>
            {/* <img style={{ ...sx, display: 'block' }} src={product?.urls?.small} alt="" /> */}
            <img  style={{ ...sx, display: 'block' }} src={defaultImage?.url + '/tr:w-200'} alt="" />
            {/* <label className='product_artist' htmlFor="">{product?.category?.name}</label> */}
            <div className="product_card--actions">
                <div className="favourite-wrapper">
                    {
                        wishlist
                            ?
                            <img
                                onClick={(e) => {
                                    e.preventDefault()
                                    removeFromWishlist.mutate(wishlist.id)
                                }}
                                className='favourite'
                                src={favourite_active}
                                alt=""
                            /> :
                            <img
                                onClick={(e) => {
                                    e.preventDefault()
                                    currentUser.data === null ?
                                        navigate('/login') :
                                        addToWishlist.mutate(product.id)
                                }}
                                className='favourite'
                                src={favourite_normal}
                                alt=""
                            />
                    }
                </div>
                <label style={{ pointerEvents: 'none' }} htmlFor="">VIEW ARTWORK</label>
            </div>
        </Link>
    )
}

export default Card
