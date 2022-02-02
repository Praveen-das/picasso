import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Rating, Button } from '@mui/material/';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './product.css'
import { useFirebase } from '../../Context/FirebaseContext';
import { useNavigate } from 'react-router-dom'
import QuantityInput from '../QuantityInput/QuantityInput';

function Product() {
    const { state } = useLocation()
    const [value, setValue] = useState(0)
    const [quantity, setQuantity] = useState([1])
    const { userData, removeFromCart, addToCart, removeFromWishlist, addToWishlist, productRating, reviews, getAverageRating } = useFirebase()
    const [rating, setRating] = useState([])
    let navigate = useNavigate()

    const handleCheckout = () => {
        state.item_quantity = Object.values(quantity)
        navigate('/checkout', { state: state })
    }

    useEffect(() => {
        if (!reviews) return
        setRating([])
        let ratings = reviews.map((o) => o.product_id === state.id && o.rating).filter((o) => o !== false)
        for (let i = 0; i < 5; i++) {
            setRating(pre => [...new Set([...pre, ratings.map((o) => o[i])])])
        }
    }, [reviews, state])
    const ratingRef = useRef()
    const handleProductRating = (newValue, productId) => {
        let rating = [0, 0, 0, 0, 0]
        rating[newValue - 1] = 1
        if (!newValue || ratingRef.current === newValue) {
            rating = [0, 0, 0, 0, 0]
            ratingRef.current = ''
            productRating(rating, productId)
            return
        }
        ratingRef.current = newValue
        productRating(rating, productId)
    }
    useEffect(() => {
        if (rating.length > 0)
            setValue(getAverageRating(rating))
    }, [rating])
    return (
        <>
            <div className='productContainer'>
                <div className="left">
                    <img id='productImage' src={state.image[0]} alt="" />
                </div>
                <div className="right">
                    <label id='productTitle'>{state.name}</label>
                    <div className="ratingAndReview">
                        <Rating
                            size="medium"
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => handleProductRating(newValue, state.id)}
                        />
                        <small id='reviews'>{rating.length > 0 && rating[0].length} reviews</small>
                    </div>
                    <div className="canvas-dimension-CW-wrapper">
                        <div className='canvas-dimension'>
                            <label id='productType'>CANVAS</label><br />
                            <label id='productDimension'>Dimension : 12 x 30</label>
                        </div>
                        <div className="cartAndWishlist">
                            {
                                userData && userData.wishlist &&
                                    userData.wishlist.filter((o) => o === state.id)[0] ?
                                    <Button size='small' onClick={() => removeFromWishlist(state.id)} sx={{ height: '30px', minWidth: 0, maxWidth: '30px', borderRadius: '50px' }} variant='contained'><FavoriteIcon fontSize='small' /></Button>
                                    :
                                    <Button size='small' onClick={() => addToWishlist(state.id)} sx={{ height: '30px', minWidth: 0, maxWidth: '30px', borderRadius: '50px' }} variant='contained'><FavoriteBorderIcon fontSize='small' /></Button>
                            }
                            {
                                (userData && userData.cart) &&
                                    userData.cart.filter((o) => o === state.id)[0] ?
                                    <Button size='small' onClick={() => removeFromCart(state.id)} sx={{ height: '30px', minWidth: 0, maxWidth: '30px', borderRadius: '50px' }} variant='contained'><RemoveShoppingCartIcon fontSize='small' /></Button> :
                                    <Button size='small' onClick={() => addToCart(state.id)} sx={{ height: '30px', minWidth: 0, maxWidth: '30px', borderRadius: '50px' }} variant='contained'><ShoppingCartIcon fontSize='small' /></Button>
                            }
                        </div>
                    </div>
                    <label id='productDimension'>Available : {state.quantity}</label>
                    <p id='productDescription'>{state.description}</p>
                    <label id='productPrice'>Rs. {state.price * quantity[0]}</label>
                    <div id="buyItem">
                        <QuantityInput quantity={quantity} setQuantity={setQuantity} index={0} />
                        <Button onClick={() => handleCheckout()} size='small' sx={{ height: '40px', width: '130px', borderRadius: '50px' }} variant='contained'>Buy now</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product