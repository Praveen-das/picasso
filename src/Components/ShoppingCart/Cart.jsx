import './cart.css'

import { useNavigate } from 'react-router-dom';
import { Button, Divider, Grid, Typography } from '@mui/material';
import Products from '../Checkout/Components/Products/Products';

function Cart({data}) {
    const navigate = useNavigate()

    const handleCart = () => {
        navigate('/checkout')
    }

    const total = data?.reduce((subTotal, item) => {
        if (item) {
            subTotal['price'] += item.price
            subTotal['discount'] += item.discount
        }
        return subTotal
    }, {
        price: 0,
        discount: 0
    })

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
                            <Typography fontWeight={700}>{`Items(${data?.length || 0})`}</Typography>
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
