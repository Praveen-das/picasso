import react, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './checkout.css'
import { useDatabase } from '../../Hooks/useDatabase';
import { useLocation } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import EmptyCart from './EmptyCart';
import { useStore } from '../../Context/Store';
import AddressCarousel from './AddressCarousel';
import QuantityInput from '../QuantityInput/QuantityInput';
import { useCart } from '../../Hooks/useCart';

function Checkout() {
    const { cart, removeFromCart, updateCart } = useCart()
    const uid = useStore(state => state.userData?.uid)
    const defaultAddress = useStore(state => state.userData?.defaultAddress)
    const { makeOrder, handleAvailableQuantity } = useDatabase()

    const [totalAmount, setTotalAmount] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState('card')

    useEffect(() => {
        if (!!cart.data?.length)
            setTotalAmount(cart.data?.reduce((x, y) => x + (y.product?.price * y.quantity), 0))
    }, [cart])

    const createInvoice = (data) => {
        const invoice = {
            products: data,
            seller_id: data.uid,
            user_id: uid,
            paymentMethod: paymentMethod,
            status: 'processing',
            address: defaultAddress,
            totalAmount: totalAmount,
            // product_quantity: quantity[0]
        }
        return invoice
    }

    const handleCheckout = () => {
        cart.data?.forEach((item, index) => {
            makeOrder(createInvoice(item)).then(() =>
                handleAvailableQuantity(item.id)
                // handleAvailableQuantity(item.id, quantity[index])
            )
        })
    }

    const style = {
        typography: {
            sx: { color: 'var(--brand)' },
            variant: 'h6',
            fontSize: 16,
            fontWeight: 600
        }
    }

    return (
        <>
            <Grid container p='2rem 2rem 2rem 5rem' spacing={3} position='relative'>
                <Grid item xs={8}>
                    <AddressCarousel />
                    <Grid item mt={4} xs={12}>
                        <Grid item xs={12} mb={2}>
                            <Typography {...style.typography}>Products</Typography>
                        </Grid>
                        <div className="checkout__product--wrapper">
                            {
                                cart && cart.data?.map(({ id, product, quantity }) =>
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
                                            <Button onClick={() => removeFromCart(id)} className='checkout__product--deleteBtn'>
                                                remove
                                            </Button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={4} position='sticky' alignSelf='flex-start' top='-3rem'>
                    <Grid item xs={12} mb={1} ml={-2}>
                        <Typography variant="h5" sx={{ fontWeight: '800' }}>Checkout</Typography>
                    </Grid>
                    <div className="checkout__wrapper">
                        <Grid item xs={12} m='1.5rem 0 0 1.4rem'>
                            <Typography {...style.typography}>Order details</Typography>
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
                            <Typography {...style.typography}>Payment options</Typography>
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
