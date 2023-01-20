import react, { useState } from 'react'
import favourite_normal from '../../Assets/Icons/favourite-normal.svg'
import favourite_active from '../../Assets/Icons/favourite-active.svg'
import './card.css'
import { Link, useNavigate } from 'react-router-dom'
import useWishlist from '../../Hooks/useWishlist'
import useUserData from '../../Hooks/useUserData'
import { useEffect } from 'react'

function Card({ product, height }) {
    const [wishlist, setWishlist] = useState(null)

    const {
        wishlists,
        addToWishlist,
        removeFromWishlist
    } = useWishlist()

    const { currentUser } = useUserData()
    const navigate = useNavigate()

    useEffect(() => {
        setWishlist(wishlists.data?.find(({ product_id }) => product_id === product.id))
    }, [wishlists])

    const images = product?.images
    const defaultImage = images?.find((o) => o.fileId === product.defaultImage)

    return (
        <Link className='product_card' style={{ height }} to={`/shop/product/${product?.id}`}>
            <label className='product_name' htmlFor="">{product?.rating}</label>
            {/* <label className='product_artist' htmlFor="">{product?.category?.name}</label> */}
            <img className='painting' src={defaultImage?.url + '/tr:w-200'} alt="" />
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
                <label style={{pointerEvents:'none'}} htmlFor="">VIEW ARTWORK</label>
            </div>
        </Link>
    )
}

export default Card
