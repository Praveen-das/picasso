import React, { useEffect, useState, useRef, memo, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import './product.css'
import { useFirebase } from '../../Context/FirebaseContext';
import { useNavigate } from 'react-router-dom'
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

function Product() {
    const [quantity, setQuantity] = useState([1])
    const [defaultImg, setDefaultImg] = useState(0)
    const [rating, setRating] = useState(null)
    const [model, setModel] = useState(false)
    const [loading, setLoading] = useState(false)

    const cart = useStore(state => state.userData.cart)
    const recentlyViewed = useStore(state => state.userData?.recently_viewed)
    const currentUser = useStore(state => state.auth?.user)
    const reviews = useStore(s => s.database.reviews)


    const { removeFromCart, addToCart, addToRecentlyViewed } = useDatabase()
    const { getAverageRating } = useHelper()
    const { state } = useLocation()

    let navigate = useNavigate()
    const AltImgRef = useRef()

    useEffect(() => {
        window.scroll({ top: 0, behavior: 'smooth' })
    }, [state])

    useEffect(() => {
        if (reviews.length === 0) return
        let ratings = reviews?.map((o) => o.product_id === state.id && o.rating).filter((o) => o !== false)

        let sortedRating = ratings.reduce((acc, cur) => {
            acc[cur] += 1
            return acc
        }, [0, 0, 0, 0, 0, 0])

        setRating(getAverageRating(sortedRating));
    }, [reviews, state, getAverageRating])

    useEffect(() => {
        if (!recentlyViewed) return
        if (recentlyViewed.map(({ id }) => id).includes(state.id)) return

        let timer = setTimeout(() => {
            addToRecentlyViewed(state)
        }, 300)

        return (() => clearTimeout(timer))
    }, [recentlyViewed, state])

    const handleCartButton = () => {
        if (cart && cart.filter((o) => o === state.id)[0])
            return {
                children: 'REMOVE FROM CART',
                onClick: () => handleCart('remove')
            }
        return {
            children: 'ADD TO CART',
            onClick: () => handleCart('add')
        }
    }

    const handleCart = (action) => {
        setLoading(true)
        if (action === 'add') {
            addToCart(state.id).then(() => setLoading(false))
        }
        if (action === 'remove') {
            removeFromCart(state.id).then(() => setLoading(false))
        }
    }

    return (
        <div style={{ marginTop: '-4rem' }}>
            <Login model={model} setModel={setModel} />
            <div style={{ marginTop: '4rem' }}>
                <FloatingCart loading={loading} />
                <div className='productContainer'>
                    <div className="left">
                        <div className="alt_images">
                            {
                                state.image.map((image, index) => (
                                    <img key={index} ref={AltImgRef} onClick={() => setDefaultImg(index)} className={`alt_image ${defaultImg === index && 'active'}`} src={image + '/tr:w-100'} alt="" />
                                ))
                            }
                        </div>
                        <img id='productImage' src={state.image[defaultImg] + '/tr:w-200'} alt="" />
                    </div>
                    <div className="right">
                        <label id='productTitle'>{state.name}</label>
                        <label id='productType'>CANVAS</label>
                        <div id="rating">
                            <Rating name="read-only" value={rating && rating} readOnly />
                            Total reviews - {reviews.filter(o => o.product_id === state.id).length}
                        </div>
                        <p id='productDescription'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo quisquam enim dolorum. Magni enim obcaecati dicta, a quas reprehenderit hic!</p>
                        {/* <p id='productDescription'>{state.description}</p> */}
                        <table>
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
                                    {state.quantity}
                                </td>
                            </tr>
                        </table>
                        <div id="buyItem">
                            <QuantityInput quantity={quantity} setQuantity={setQuantity} index={0} />
                            <label id='productPrice'>Rs. {state.price * quantity[0]}</label>
                        </div>
                        <LoadingButton sx={{ width: '100%', maxWidth: '250px', padding: '10px', mt: '15px' }} loading={loading} variant='contained' {...handleCartButton()} />
                        <Typography mt={2} variant='overline' fontSize={'0.9rem'} >Free Shipping on orders above Rs.2000 </Typography>
                    </div>
                </div>
                <Reviews state={state} />
            </div>
            {
                currentUser &&
                <>
                    <label className='recently_viewed' htmlFor="">Recently viewed</label>
                    <Tray height={230} data={recentlyViewed && recentlyViewed} from='110%' to='-50%' parent='productContainer_wrapper' />
                </>
            }
        </div>
    )
}

export default Product