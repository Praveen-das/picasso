import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './checkout.css'
import { useFirebase } from '../../Context/FirebaseContext';
import { useLocation } from 'react-router-dom';
import QuantityInput from '../QuantityInput/QuantityInput';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddAddress from '../Profile/AddAddress';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.min.css';
import { Mousewheel } from "swiper"
import EmptyCart from './EmptyCart';

function Checkout() {
    const { userData, allProducts, makeOrder, handleAvailableQuantity, removeFromCart } = useFirebase()
    const [defaultAddress, setDefaultAddress] = useState(0)
    let { state } = useLocation()
    const [quantity, setQuantity] = useState([])
    const [cart, setCart] = useState([])
    const [open, setOpen] = useState(false)
    const [totalAmount, setTotalAmount] = useState()
    const [paymentMethod, setPaymentMethod] = useState()

    useEffect(() => {
        if (state)
            return setTotalAmount(state.price * (quantity && quantity[0]))
        if (cart && cart.length > 0)
            setTotalAmount(cart?.map((o, i) => o.price * (quantity[i] ? quantity[i] : 1)).reduce((a, b) => a + b))
    }, [state, quantity, cart])

    useEffect(() => {

        if (state) {
            setQuantity(state?.item_quantity);
            return setCart([state])
        }
        if (allProducts && userData) {
            if (!userData.cart) return setCart()
            userData.cart.forEach(() => setQuantity(pre => [...pre, 1]))
            setCart(allProducts.filter((o) => userData.cart.includes(o.id)))
        }
    }, [allProducts, userData, state])

    useEffect(() => {
        if (!userData) return
        if (!userData.address) return
        userData.address && userData.address.forEach((o) => o.defaultAddress = 0)
        setDefaultAddress(userData.address[userData.address.length - 1])
    }, [userData])

    const handleAddress = (index) => {
        userData.address.forEach((o) => o.defaultAddress = index)
        setDefaultAddress(userData.address[index])
    }

    useEffect(() => {
        setPaymentMethod('card')
    }, [])

    const createInvoice = (data) => {
        const invoice = {
            product: data,
            seller_id: data.uid,
            user_id: userData.uid,
            paymentMethod: paymentMethod,
            status: 'processing',
            address: defaultAddress,
            totalAmount: totalAmount,
            product_quantity: quantity[0]
        }
        return invoice
    }

    const handleCheckout = () => {
        if (!paymentMethod) return
        if (!userData) return
        if (state) {
            makeOrder(state)
            handleAvailableQuantity(state.id, quantity[0])
            return
        }
        cart?.forEach((item, index) => {
            makeOrder(createInvoice(item)).then(() =>
                handleAvailableQuantity(item.id, quantity[index])
            )
        })
    }
    useEffect(() => {
        console.log(quantity);
    }, [quantity])

    useEffect(() => {
        if (userData && userData.address)
            userData.address = userData.address.reverse()
    }, [userData])

    if (cart || state)
        return (
            <>
                <AddAddress open={open} setOpen={setOpen} />
                <Grid container p='2rem 5rem' spacing={3}>
                    <Grid item xs={8} gap={5}>
                        <Grid item xs={12} mb={4} ml={-4}>
                            <Typography variant="h5" sx={{ fontWeight: '800' }}>Payment info</Typography>
                        </Grid>
                        <Grid item xs={12} mb={2}>
                            <Typography sx={{ color: 'var(--brand)' }} variant="h4" fontSize={18}>Delivery address</Typography>
                        </Grid>
                        <Grid item gap={2} xs={
                            userData &&
                                userData.address ? userData.address.length > 1 ? 12 : 6 : 1
                        } display='flex'>
                            {
                                userData && userData.address &&
                                <Swiper
                                    slidesPerView={
                                        userData &&
                                            userData.address.length > 1 ? 2 : 1
                                    }
                                    spaceBetween={15}
                                    mousewheel={true}
                                    modules={[Mousewheel]}
                                    className="checkout_swiper"
                                    initialSlide={0}
                                >
                                    {
                                        userData.address.map((user, index) =>
                                            <SwiperSlide key={index}>
                                                <div
                                                    className="checkout__address"
                                                    onClick={(e) => handleAddress(index)}
                                                    style={
                                                        {
                                                            transform: user.defaultAddress === index && 'translate(-4px,-4px)',
                                                            boxShadow: user.defaultAddress === index && '8px 8px 10px 2px var(--shadow)'
                                                        }
                                                    }>
                                                    {
                                                        user.defaultAddress === index &&
                                                        <div className="checkout__address--checked">
                                                            <CheckCircleIcon sx={{ color: 'var(--brand)', fontSize: '25px' }} />
                                                        </div>
                                                    }
                                                    <Typography variant='h5' fontSize={15}>{user.name}</Typography>
                                                    <Typography variant='h3' color='ThreeDDarkShadow' lineHeight={1.3} fontSize={13}>{user.address} {user.postalCode}</Typography>
                                                    <Typography>{user.phoneNumber}</Typography>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    }
                                </Swiper>
                            }
                            <Button variant='contained' onClick={() => setOpen(true)} sx={
                                {
                                    borderRadius: '10px',
                                    minWidth: '100px',
                                    height: '100px',
                                    margin: 'auto',
                                    boxShadow: 'none',
                                    background: 'lightgrey',
                                    '&:hover': {
                                        boxShadow: 'none',
                                        background: '#999999',
                                    }
                                }
                            }><AddIcon fontSize='large' /></Button>
                        </Grid>
                        <Grid item mt={4} xs={12}>
                            <Grid item xs={12} mb={2}>
                                <Typography sx={{ color: 'var(--brand)' }} variant="h4" fontSize={18}>Products</Typography>
                            </Grid>
                            <div className="checkout__product--wrapper">
                                {
                                    cart && cart.map((product, index) =>
                                        <div key={index} className="checkout__product">
                                            <div className='product_imgNQty'>
                                                <img src={product.image[product.defaultImage] + '/tr:w-100'} alt="" />
                                                <div className='product_qty'>
                                                    <QuantityInput quantity={quantity} setQuantity={setQuantity} index={index} />
                                                </div>
                                            </div>
                                            <div className='checkout__product--details'>
                                                <label className='checkout__product--name' htmlFor="">{product.name}</label>
                                                <Typography width='90%' variant='caption' fontSize={14}>{product.description}</Typography>
                                                <label className='checkout__product--price' htmlFor="">Rs. {product.price * quantity[index]}</label>
                                                {!state && <Button onClick={() => removeFromCart(product.id)} className='checkout__product--deleteBtn'>
                                                    remove
                                                </Button>}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid item xs={12} mb={4} ml={-4}>
                            <Typography variant="h5" sx={{ fontWeight: '800' }}>Checkout</Typography>
                        </Grid>
                        <div className="checkout__wrapper">
                            <Grid item xs={12} m='1.5rem 0 0 1.4rem'>
                                <Typography sx={{ color: 'var(--brand)' }} variant="h4" fontSize={18}>Order details</Typography>
                            </Grid>
                            <div className="checkout__checkout">
                                <label>Price</label>
                                <label>{totalAmount}</label>
                                <label>Delivery charge</label>
                                <label>Free</label>
                                <label>Discount price</label>
                                <label>{totalAmount}</label>
                                <label>Total amount</label>
                                <label>{totalAmount}</label>
                            </div>
                            <Grid item xs={12} padding='0 1.5rem'>
                                <Divider sx={{ width: '100%' }} />
                            </Grid>
                            <Grid item xs={12} m='1.5rem 0 0 1.4rem'>
                                <Typography sx={{ color: 'var(--brand)' }} variant="h4" fontSize={18}>Order details</Typography>
                            </Grid>
                            <div className="checkout__method">
                                <div>
                                    <input defaultChecked={true} onChange={() => setPaymentMethod('card')} name='payment' type="radio" />
                                    <CreditCardIcon sx={{ fontSize: '18px' }} />
                                    <label htmlFor="">Credit card/Debit card</label>
                                </div>
                                <div>
                                    <input onChange={() => setPaymentMethod('cod')} name='payment' type="radio" />
                                    <LocalShippingIcon sx={{ fontSize: '18px' }} />
                                    <label htmlFor="">COD</label>
                                </div>
                            </div>
                            <Grid item xs={12} p='1.5rem' pt={0}>
                                <Button onClick={() => handleCheckout()} size='large' variant='contained' fullWidth>Checkout</Button>
                            </Grid>
                        </div>
                    </Grid>

                </Grid>
            </>
        )
    return < EmptyCart />
}

export default Checkout
