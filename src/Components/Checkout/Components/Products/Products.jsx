import { Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { useCart } from '../../../../Hooks/useCart'
import QuantityInput from '../../../QuantityInput/QuantityInput';
import './products.css'

function Products() {
    const { cart, updateCart, removeFromCart } = useCart()

    return (
        <>
            <Grid item xs={12}>
                <div className="checkout__product--wrapper">
                    {
                        cart.data && cart.data[0].map(({ id, product, quantity }) =>
                            <div key={id} className="checkout__product">
                                <div className='product_imgNQty'>
                                    <img src={product.images[0].url + '/tr:w-100'} alt="" />
                                    <div className='product_qty'>
                                        <QuantityInput onChange={(quantity) => updateCart.mutateAsync({ id, quantity })} defaultValue={quantity} />
                                    </div>
                                </div>
                                <div className='checkout__product--details'>
                                    <label className='checkout__product--name' htmlFor="">{product.name}</label>
                                    <Typography width='90%' variant='caption' fontSize={14}>{product.desc}</Typography>
                                    <label className='checkout__product--price' htmlFor="">Rs. {product.price * quantity}</label>
                                    <Button onClick={() => removeFromCart.mutate(id)} className='checkout__product--deleteBtn'>
                                        remove
                                    </Button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Grid>
        </>
    )
}

export default Products