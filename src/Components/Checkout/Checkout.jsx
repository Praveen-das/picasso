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


import 'swiper/swiper.min.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import EmptyCart from './EmptyCart';

function Checkout() {
    const { userData, allProducts, makeOrder, handleAvailableQuantity } = useFirebase()
    const [address, setAddress] = useState()
    const [isDefault, setIsDefault] = useState(0)
    let { state } = useLocation()
    const [quantity, setQuantity] = useState(state ? state.item_quantity : [1])
    const [cart, setCart] = useState()
    const [open, setOpen] = useState(false)
    const [totalAmount, setTotalAmount] = useState()
    const [paymentMethod, setPaymentMethod] = useState()

    useEffect(() => {
        if (state) {
            return setTotalAmount(state.price * (quantity && quantity[0]))
        }
        setTotalAmount(cart && cart.map((o, i) => o.price * (quantity[i] ? quantity[i] : 1)).reduce((a, b) => a + b))
    }, [state, quantity, cart])

    useEffect(() => {
        setIsDefault(0)
        setAddress(userData && userData.address[0]);
        if (state) {
            return setCart([state])
        }
        if (allProducts && userData) {
            if (!userData.cart) return setCart()
            userData.cart.forEach((o, i) => setQuantity(pre => [...pre, [1]]))
            setCart(allProducts.filter((o) => userData.cart.includes(o.id)))
        }
    }, [allProducts, userData, state])

    if (userData)
        userData.address.forEach((o) => o.isDefault = isDefault)

    const handleAddress = (e, index, data) => {
        setAddress(data);
        setIsDefault(index)
    }

    useEffect(() => {
        setPaymentMethod('card')
    }, [])

    const handleCheckout = async () => {
        if (!paymentMethod) return
        await makeOrder({
            product: state,
            seller_id: state.uid,
            user_id: userData.uid,
            paymentMethod: paymentMethod,
            status: 'processing',
            address: address,
            totalAmount: totalAmount,
            product_quantity: quantity[0]
        })
        await handleAvailableQuantity(state.id, quantity[0])
    }

    useEffect(() => {
        if (userData)
            userData.address = userData.address.reverse()
    }, [userData])

    if ((userData && !userData.cart) && !state)
        return <EmptyCart />
    return (
        <>
            <AddAddress open={open} setOpen={setOpen} />
            <Grid container p='2rem 5rem' spacing={3}>
                <Grid item xs={8} gap={5}>
                    <Grid item xs={12} mb={4} ml={-4}>
                        <Typography variant="h5" sx={{ fontWeight: '800' }}>Payment info</Typography>
                    </Grid>
                    <Grid item xs={12} mb={1}>
                        <Typography sx={{ color: 'var(--brand)' }} variant="h4" fontSize={18}>Delivery address</Typography>
                    </Grid>
                    <Grid item gap={2} xs={12} display='flex'>
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={15}
                            className="mySwiper"
                            initialSlide={0}
                        >
                            {
                                userData?.address.map((user, index) =>
                                    <SwiperSlide key={index}>
                                        <div
                                            className="checkout__address"
                                            onClick={(e) => handleAddress(e, index, user)}
                                            style={
                                                {
                                                    transform: user.isDefault === index && 'translateY(-4px)',
                                                    boxShadow: user.isDefault === index && '0 6px 5px rgba(0, 0, 0, 0.250)'
                                                }
                                            }>
                                            {
                                                user.isDefault === index &&
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
                                        <img src={product.image[product.defaultImage] + '/tr:w-100'} alt="" />
                                        <div className='checkout__product--details'>
                                            <div><label className='checkout__product--name' htmlFor="">{product.name}</label></div>
                                            <Typography width='90%' variant='caption' fontSize={14}>{product.description}</Typography>
                                        </div>
                                        <div className='checkout__product--price'>
                                            <label htmlFor="">Rs. {product.price * quantity[index]}</label>
                                            <QuantityInput quantity={quantity} setQuantity={setQuantity} index={index} />
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
}

export default Checkout
