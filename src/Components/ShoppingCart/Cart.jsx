import './cart.css'

import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useCart } from '../../Hooks/useCart';
import { Fragment } from 'react';

import QuantityInput from '../QuantityInput/QuantityInput';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import WishlistButton from '../WishlistButton/WishlistButton';
import { calculateDiscount } from '../../Utils/utils';
import { Link } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import LoadingScreen from '../MUIComponents/LoadingScreen'

function Cart() {
    const navigate = useNavigate()
    const { cart, updateCart, removeFromCart } = useCart()
    const cart_items = cart.data?.[0]
    const total_price = cart.data?.[1].total_price
    const total_discount = cart.data?.[1].total_discount

    const handleCart = () => {
        navigate('/checkout')
    }

    const container = {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        minHeight: '100%',
        alignContent: 'flex-start'
    }

    if (!cart.isFetched && (cart.isLoading || cart.isFetching)) return <LoadingScreen />
    if (cart.isFetched && !cart.data?.[0]?.length) return <EmptyCart />
    return (
        <>
            <Grid container columnSpacing={12} rowSpacing={4} p='1rem 3rem 2rem 3rem' minHeight='100%' position='sticky' top='2rem' alignSelf='flex-start'>
                <Grid container item xs={7.5} rowSpacing={4} >
                    <Grid item xs={12} >
                        <Typography variant='tabTitle'>Shopping Cart</Typography>
                    </Grid>
                    <Grid item xs={12} minHeight='100%'>
                        <Box sx={container}>
                            <Typography variant='title.primary'>
                                Products
                            </Typography>
                            <div className="checkout__product--wrapper">
                                {
                                    cart_items?.map(({ id, product, quantity }, key) =>
                                        <Fragment key={id}>
                                            <Box sx={{ display: 'flex', gap: 4 }}>
                                                <img className='img_border' width={120} height={120} src={product.images[0].url + '/tr:w-100'} alt="" />
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Link to={`/shop/product/${product?.id}`}>
                                                        <Typography variant='paragraph'>{product.name}</Typography>
                                                    </Link>
                                                    <Typography fontWeight={700} fontSize={18}>Rs. {product.price * quantity}</Typography>
                                                    <Box sx={{ display: 'flex', gap: 4, mt: 'auto' }}>
                                                        <Box mx='auto'>
                                                            <QuantityInput size='small' onChange={(quantity) => {
                                                                let updates = {
                                                                    id,
                                                                    quantity,
                                                                    price: quantity * product?.price,
                                                                    discount: calculateDiscount(product?.price, 12, quantity)
                                                                }
                                                                updateCart.mutateAsync(updates)
                                                            }} defaultValue={quantity} />
                                                        </Box>
                                                        <Box display='flex' gap={2}>
                                                            <LoadingButton
                                                                size='small'
                                                                variant='outlined'
                                                                sx={{ justifySelf: 'flex-start' }}
                                                                startIcon={<DeleteOutlineIcon fontSize='small' />}
                                                                onClick={() => removeFromCart.mutate(id)}
                                                            >
                                                                Remove from cart
                                                            </LoadingButton>
                                                            <WishlistButton
                                                                button={<LoadingButton
                                                                    size='small'
                                                                    variant='outlined'
                                                                    sx={{ justifySelf: 'flex-start' }}
                                                                />}
                                                                primaryText='save for later'
                                                                secondaryText='saved for later'
                                                                productId={product?.id}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            {
                                                cart.data && cart.data[0][key + 1] &&
                                                <Divider variant='fullWidth' />
                                            }
                                        </Fragment>
                                    )
                                }
                            </div>
                            <Link style={{ marginTop: 'auto', marginBottom: '2rem' }} to='/shop'><Typography variant='paragraph' sx={{ textDecoration: 'underline' }}>CONTINUE SHOPPING</Typography></Link>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs position='sticky' alignSelf='flex-start' top={0}>
                    <div className="checkout__wrapper">
                        <Typography sx={{ mb: 2 }} variant='title.primary'>Price Details</Typography>
                        <Divider sx={{ width: '100%' }} />
                        <div className="checkout__checkout">
                            <Typography variant='title.secondary'>{`Items(${cart_items?.length || 0})`}</Typography>
                            <Typography variant='paragraph'>₹{total_price}</Typography>
                            <Typography variant='title.secondary'>Discount</Typography>
                            <Typography variant='paragraph'>{total_discount > 0 ? `-₹${total_discount}` : '₹0'}</Typography>
                            <Typography variant='title.primary' >Sub-total</Typography>
                            <Typography fontSize={24} fontWeight={800}>₹{total_price - total_discount}</Typography>
                        </div>
                        {/* <Divider sx={{ width: '100%' }} /> */}
                        <Button sx={{ mt: 4 }} onClick={() => handleCart()} size='large' variant='contained' fullWidth>Proceed to Checkout</Button>
                    </div>
                </Grid>
            </Grid >
        </>
    )
}

export default Cart
