import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './cart.css'

import Divider from '@mui/material/Divider';

import EmptyCart from './EmptyCart';
import { useCart } from '../../Hooks/useCart';
import { useNavigate } from 'react-router-dom';
import Products from '../Checkout/Components/Products/Products';
import { useEffect, useMemo, useRef, useState } from 'react';
import useCurrentUser from '../../Hooks/useCurrentUser';

function Cart() {
    const navigate = useNavigate()
    const { currentUser } = useCurrentUser()
    const cart_items = currentUser.data?.cart
    // const { cart: cart_items } = useCart()
    // const [_, { total_price }] = cart_items || [[], { total_price: 0 }]


    const handleCart = () => {
        navigate('/checkout')
    }

    const total = useMemo(() =>
        cart_items?.reduce((subTotal, item) => {
            if (item) {
                subTotal['price'] += item.price
                subTotal['discount'] += item.discount
                return subTotal
            }
        }, {
            price: 0,
            discount: 0
        }), [cart_items])

    // if (cart_items.isLoading) return <LoadingScreen />

    return (
        <>
            <Grid container p='1rem 2rem 2rem 2rem' spacing={4} position='relative'>
                <Grid item xs={8}>
                    <Grid item xs={12} mb={2} >
                        <Typography variant="h6" sx={{ fontWeight: '800' }}>SHOPPING CART</Typography>
                    </Grid>
                    <Products />
                </Grid>
                <Grid item xs={4} position='sticky' alignSelf='flex-start' top='0'>
                    <Grid item xs={12} mb={2} >
                        <Typography variant="h6" sx={{ fontWeight: '800' }}>PRICE DETAILS</Typography>
                    </Grid>
                    <div className="checkout__wrapper">
                        <div className="checkout__checkout">
                            <Typography fontWeight={700}>{`Items(${cart_items?.length || 0})`}</Typography>
                            <Typography variant='title.grey'>₹{total?.price}</Typography>
                            <Typography fontWeight={700}>Discount</Typography>
                            <Typography variant='title.grey'>{total?.discount > 0 ? `-₹${total?.discount}` : '₹0'}</Typography>
                            <Typography variant='h6' fontWeight={700}>Sub-total</Typography>
                            <Typography fontSize={18} fontWeight={700}>₹{total?.price - total?.discount}</Typography>
                        </div>
                        <Divider sx={{ width: '100%' }} />
                        <Button sx={{ py: 2 }} onClick={() => handleCart()} size='large' variant='contained' fullWidth>Proceed to Checkout</Button>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default Cart
