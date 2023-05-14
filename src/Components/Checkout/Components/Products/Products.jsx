import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useCart } from '../../../../Hooks/useCart'
import QuantityInput from '../../../QuantityInput/QuantityInput';
import './products.css'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Products() {
    const { cart, updateCart, removeFromCart } = useCart()

    useEffect(() => {
        console.log(cart);
    }, [cart])

    return (
        <>
            <Grid item xs={12}>
                <div className="checkout__product--wrapper">
                    {
                        cart.data && cart.data[0].map(({ id, product, quantity }) =>
                            <div className="checkout__product">
                                <div key={product?.id} className='product_imgNQty'>
                                    <img src={product.images[0].url + '/tr:w-100'} alt="" />
                                </div>
                                <div className='checkout__product--details'>
                                    <Box>
                                        <Box display='flex'>
                                            <Typography textTransform='capitalize' fontSize={18} fontWeight={500} >{product.name}</Typography>
                                            {/* <Typography sx={{ ml: 'auto' }} fontSize={16} >Delivery by</Typography> */}
                                        </Box>
                                        <Typography variant='text.grey'>Seller: {product.sales_person.displayName}</Typography>
                                    </Box>
                                    <Box mt={2}>
                                        <Typography fontWeight={600}>Rs. {product.price * quantity}</Typography>
                                    </Box>
                                </div>
                                <Box mx='auto'>
                                    <QuantityInput size='small' onChange={(quantity) => updateCart.mutateAsync({ id, quantity, price: quantity * product?.price })} defaultValue={quantity} />
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
                                    <LoadingButton
                                        size='small'
                                        variant='outlined'
                                        sx={{ justifySelf: 'flex-start' }}
                                        startIcon={<FavoriteBorderIcon fontSize='small' />}
                                        onClick={() => removeFromCart.mutate(id)}
                                    >
                                        Save for later
                                    </LoadingButton>
                                </Box>
                            </div>
                        )
                    }
                </div>
            </Grid>
        </>
    )
}

export default Products