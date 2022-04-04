import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './product.css'
import { useFirebase } from '../../Context/FirebaseContext';
import { useNavigate } from 'react-router-dom'
import QuantityInput from '../QuantityInput/QuantityInput';
import Reviews from '../Reviews/Reviews';
import Tray from '../ProductsTray/Tray';
import { Rating } from '@mui/material';
import Login from '../Login/Login';

function Product() {
    const { state } = useLocation()
    const [quantity, setQuantity] = useState([1])
    let navigate = useNavigate()
    const { handleRecentlyViewed, getAverageRating, reviews, userData, currentUser, recentlyViewed, removeFromCart, addToCart } = useFirebase()
    const [defaultImg, setDefaultImg] = useState(0)
    const AltImgRef = useRef()
    const [rating, setRating] = useState(null)
    const [model, setModel] = useState(false)

    const handleCheckout = () => {
        state.item_quantity = Object.values(quantity)
        navigate('/checkout', { state: state })
    }

    useEffect(() => {
        if (!reviews) return
        let ratings = reviews.map((o) => o.product_id === state.id && o.rating).filter((o) => o !== false)

        let sortedRating = ratings.reduce((acc, cur) => {
            acc[cur] += 1
            return acc
        }, [0, 0, 0, 0, 0, 0])

        setRating(getAverageRating(sortedRating));
    }, [reviews, state, getAverageRating])

    useEffect(() => {
        if (recentlyViewed?.map(({ id }) => id).includes(state.id)) return

        let timer = setTimeout(() => {
            handleRecentlyViewed(state)
        }, 300)

        return (() => clearTimeout(timer))
    }, [recentlyViewed, handleRecentlyViewed, state])

    const handleCartButton = () => {
        if (userData && userData.cart) {
            if (userData.cart.filter((o) => o === state.id)[0])
                return {
                    children: 'REMOVE FROM CART',
                    onClick: () => removeFromCart(state.id)
                }
            return {
                children: 'ADD TO CART',
                onClick: () => addToCart(state.id)
            }
        }
        return {
            children: 'ADD TO CART',
            onClick: () => setModel(!model)
        }
    }

    return (
        <>
            <Login model={model} setModel={setModel} />
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
                    <Rating name="read-only" value={rating && rating} readOnly />
                    <label id='productType'>CANVAS</label>
                    <label id='productDimension'>Dimension : 12 x 30</label>
                    <label id='productDimension'>Available : {state.quantity}</label>
                    <p id='productDescription'>{state.description}</p>
                    <label id='productPrice'>Rs. {state.price * quantity[0]}</label>
                    <div id="buyItem">
                        <QuantityInput quantity={quantity} setQuantity={setQuantity} index={0} />
                    </div>
                    <div className='product_btns'>
                        <button onClick={handleCheckout} className='button_secondary'>BUY NOW</button>
                        <button {...handleCartButton()} className='button_primary' />
                    </div>
                </div>
            </div>
            <hr style={{ width: '100%' }} />
            {
                currentUser &&
                <>
                    <label className='recently_viewed' htmlFor="">Recently viewed</label>
                    <Tray height={300} data={recentlyViewed} from='110%' to='-50%' parent='productContainer_wrapper' />
                </>
            }
            <Reviews state={state} />
        </>
    )
}

export default Product