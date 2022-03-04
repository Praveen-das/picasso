import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './product.css'
import { useFirebase } from '../../Context/FirebaseContext';
import { useNavigate } from 'react-router-dom'
import QuantityInput from '../QuantityInput/QuantityInput';
import Reviews from '../Reviews/Reviews';
import Tray from '../ProductsTray/Tray';

function Product() {
    const { state } = useLocation()
    const [quantity, setQuantity] = useState([1])
    let navigate = useNavigate()
    const { handleRecentlyViewed, userData, recentlyViewed, removeFromCart, addToCart } = useFirebase()
    const [defaultImg, setDefaultImg] = useState(0)
    const AltImgRef = useRef()

    const handleCheckout = () => {
        state.item_quantity = Object.values(quantity)
        navigate('/checkout', { state: state })
    }

    useEffect(() => {
        // handleRecentlyViewed(state)
        console.log(state.quantity);
    }, [state])

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
    }

    return (
        <>
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
                    {/* <div className="canvas-dimension-CW-wrapper">
                        <div className='canvas-dimension'>
                        </div>
                    </div> */}
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
            <label className='recently_viewed' htmlFor="">Recently viewed</label>
            <Tray height={300} data={recentlyViewed} from='110%' to='-50%' parent='productContainer_wrapper' />
            <Reviews state={state} />
        </>
    )
}

export default Product