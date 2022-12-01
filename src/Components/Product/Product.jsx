import react, { useEffect, useState, useRef, memo, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import './product.css'
import { useFirebase } from '../../Context/FirebaseContext';
import { useNavigate, useParams } from 'react-router-dom'
import QuantityInput from '../QuantityInput/QuantityInput';
import Reviews from '../Reviews/Reviews';
import Tray from '../ProductsTray/Tray';
import { Button, Rating, Typography } from '@mui/material';
import Login from '../Login/Login';
import { useStore } from '../../Context/Store'
import { useDatabase } from '../../Hooks/useDatabase'
import { useHelper } from '../../Hooks/useHelper'
import { LoadingButton } from '@mui/lab';
import FloatingCart from '../FloatingCart/FloatingCart';
import { useCart } from '../../Hooks/useCart';
import { current } from 'immer';
import useUserData from '../../Hooks/useUserData';

function Product() {
    const [quantity, setQuantity] = useState(1)
    const [defaultImg, setDefaultImg] = useState(0)
    const [rating, setRating] = useState(null)
    const [loading, setLoading] = useState(false)

    const { currentUser } = useUserData()
    const { addToCart, removeFromCart, cart } = useCart(currentUser.data?.id)

    const { getAverageRating } = useHelper()
    const { state: product } = useLocation()
    
    let navigate = useNavigate()
    const AltImgRef = useRef()

    useEffect(() => {
        if (!product.review?.length) return
        let ratings = product.review?.map((o) => o.product_id === product.id && o.rating).filter((o) => o !== false)

        let sortedRating = ratings?.reduce((acc, cur) => {
            acc[cur] += 1
            return acc
        }, [0, 0, 0, 0, 0, 0])

        setRating(getAverageRating(sortedRating));
    }, [product, getAverageRating])

    // useEffect(() => {
    //     if (!recentlyViewed) return
    //     if (recentlyViewed?.map(({ id }) => id).includes(state.id)) return

    //     let timer = setTimeout(() => {
    //         addToRecentlyViewed(state)
    //     }, 300)

    //     return (() => clearTimeout(timer))
    // }, [recentlyViewed, state])

    const handleCartButton = () => {
        const cartItem = cart.data?.find((o) => o.product_id === product.id)

        if (cartItem)
            return {
                children: 'REMOVE FROM CART',
                onClick: () => removeFromCart.mutateAsync(cartItem.id).then(() => setLoading(false))
            }

        return {
            children: 'ADD TO CART',
            onClick: () => addToCart.mutateAsync({
                product_id: product.id,
                quantity,
                discount: product.discount
            })
                .then((res) => {
                    console.log(res)
                    setLoading(false)
                })
        }
    }

    return (
        <div style={{ marginTop: '-4rem' }}>
            <div style={{ marginTop: '4rem' }}>
                {currentUser.data && <FloatingCart loading={loading} />}
                <div className='productContainer'>
                    <div className="left">
                        <div className="alt_images">
                            {
                                product?.images?.map((image, index) => (
                                    <img key={index} ref={AltImgRef} onClick={() => setDefaultImg(index)} className={`alt_image ${defaultImg === index && 'active'}`} src={image.url + '/tr:w-100'} alt="" />
                                ))
                            }
                        </div>
                        <img id='productImage' src={product?.images[defaultImg].url + '/tr:w-200'} alt="" />
                    </div>
                    <div className="right">
                        <label id='productTitle'>{product.name}</label>
                        <label id='productType'>{product.material.name.toUpperCase()}</label>
                        {/* <div id="rating">
                            <Rating name="read-only" value={rating && rating} readOnly />
                            Total reviews - {reviews.filter(o => o.product_id === product.id).length}
                        </div> */}
                        <p id='productDescription'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo quisquam enim dolorum. Magni enim obcaecati dicta, a quas reprehenderit hic!</p>
                        {/* <p id='productDescription'>{product.desc}</p> */}
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label id='productDimension'>Dimension :</label>
                                    </td>
                                    <td>
                                        <label id='productDimension'>12 x 30</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label id='productDimension'>Available :</label>
                                    </td>
                                    <td>
                                        {product.quantity}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="buyItem">
                            <QuantityInput onChange={(value) => setQuantity(value)} />
                            <label id='productPrice'>Rs. {product.price * quantity}</label>
                        </div>
                        <LoadingButton sx={{ width: '100%', maxWidth: '250px', padding: '10px', mt: '15px' }} loading={loading} variant='contained' {...handleCartButton()} />
                        <Typography mt={2} variant='overline' fontSize={'0.9rem'} >Free Shipping on orders above Rs.2000 </Typography>
                    </div>
                </div>
                <Reviews product={product} />
            </div>
            {/* {
                currentUser &&
                <>
                    <label className='recently_viewed' htmlFor="">Recently viewed</label>
                    <Tray height={230} data={recentlyViewed && recentlyViewed} from='110%' to='-50%' parent='productContainer_wrapper' />
                </>
            } */}
        </div>
    )
}

export default Product