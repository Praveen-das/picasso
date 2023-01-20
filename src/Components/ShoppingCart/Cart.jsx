import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './cart.css'

import Divider from '@mui/material/Divider';

import EmptyCart from './EmptyCart';
import { useCart } from '../../Hooks/useCart';
import { useNavigate } from 'react-router-dom';
import Products from '../Checkout/Components/Products/Products';

function Cart() {
    const navigate = useNavigate()
    const { cart: cart_items } = useCart()

    const [_, { total_price }] = cart_items.data || [[], { total_price: 0 }]

    const handleCart = () => {
        navigate('/checkout')
    }

    // if (cart_items.isLoading) return <LoadingScreen />

    return (
        <>
            <Grid container p='1rem 2rem 2rem 2rem' spacing={3} position='relative'>
                <Grid item xs={8}>
                    <Grid item xs={12} mb={2} >
                        <Typography variant="h6" sx={{ fontWeight: '800' }}>SHOPPING CART</Typography>
                    </Grid>
                    <Products />
                </Grid>
                <Grid item xs={4} position='sticky' alignSelf='flex-start' top='-3rem'>
                    <Grid item xs={12} mb={2} >
                        <Typography variant="h6" sx={{ fontWeight: '800' }}>PRICE DETAILS</Typography>
                    </Grid>
                    <div className="checkout__wrapper">
                        <div className="checkout__checkout">
                            <label>Price</label>
                            <label>{total_price}</label>
                            <label>Delivery charge</label>
                            <label>Free</label>
                            <label>Discount price</label>
                            <label>{total_price}</label>
                            <label>Total amount</label>
                            <label>{total_price}</label>
                        </div>
                        <Grid item xs={12} padding='0 1.5rem'>
                            <Divider sx={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} p='2rem 1.5rem' >
                            <Button onClick={() => handleCart()} size='large' variant='contained' fullWidth>Proceed to Buy</Button>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </>
    )
    return < EmptyCart />
}

export default Cart
