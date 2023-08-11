import { Box, Divider, Grid, Typography } from '@mui/material';
import React, { Fragment } from 'react'
import { useCart } from '../../../../Hooks/useCart'
import QuantityInput from '../../../QuantityInput/QuantityInput';
import './products.css'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import WishlistButton from '../../../WishlistButton/WishlistButton';
import { calculateDiscount } from '../../../../Utils/utils';
import { Link } from 'react-router-dom';

function Products() {
    const { cart, updateCart, removeFromCart } = useCart()

    return (
        <>
            <Grid item xs={12} >
                <div className="checkout__product--wrapper">
                    {
                        cart.data && cart.data[0].map(({ id, product, quantity }, key) =>
                            <Fragment key={id}>
                                <div className="checkout__product">
                                    <div key={product?.id} className='product_imgNQty'>
                                        <img src={product.images[0].url + '/tr:w-100'} alt="" />
                                    </div>
                                    <div className='checkout__product--details'>
                                        <Box>
                                            <Link to={`/shop/product/${product?.id}`}>
                                                <Typography textTransform='capitalize' fontSize={18} fontWeight={500} >{product.name}</Typography>
                                                {/* <Typography sx={{ ml: 'auto' }} fontSize={16} >Delivery by</Typography> */}
                                            </Link>
                                            <Typography variant='text.grey'>Seller: {product.sales_person.displayName}</Typography>
                                        </Box>
                                        <Box mt={2}>
                                            <Typography fontWeight={600}>Rs. {product.price * quantity}</Typography>
                                        </Box>
                                    </div>
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
                                </div>
                                {
                                    cart.data && cart.data[0][key + 1] &&
                                    <Divider variant='fullWidth' />
                                }
                            </Fragment>
                        )
                    }
                </div>
            </Grid>
        </>
    )
}

export default Products