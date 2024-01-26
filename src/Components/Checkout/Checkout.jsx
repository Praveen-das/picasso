import React, { useState } from 'react'
import './checkout.css'

import { Box, Grid, Button, Typography, Divider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Link, Navigate } from 'react-router-dom';
import { useCart } from '../../Hooks/useCart';
import useCurrentUser from '../../Hooks/useCurrentUser';
import LoadingScreen from '../Ui/LoadingScreen'
import EditsModal from '../Ui/Modals/EditsModal'

import { loadScript } from '../../Utils/utils';
import axiosClient from '../../lib/axiosClient';
import { ReactComponent as Visa } from '../../Assets/svg/visa.svg'
import { ReactComponent as Mastercard } from '../../Assets/svg/mastercard.svg'
import { ReactComponent as Upi } from '../../Assets/svg/upi.svg'
import { useStore } from '../../Store/Store';
import { BASE_URL } from '../../Utils/urls';

const button_style = {
  borderRadius: '100px',
  fontSize: '0.8rem'
}

const item = {
  boxSizing: 'border-box',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
}

const container = {
  display: 'grid',
  gap: 3,
}

function Checkout() {
  const [open, setOpen] = useState(false)
  const { currentUser: { data: user } } = useCurrentUser();
  const address = user?.default_address

  const { cart: { data, isLoading, isFetching, isFetched } } = useCart(user)
  const cart = data?.[0]
  const total_price = data?.[1].total_price
  const total_discount = data?.[1].total_discount

  if (isLoading || isFetching) return <LoadingScreen />
  if (isFetched && !cart?.length) return <Navigate to='/cart' />

  return (
    <>
      <EditsModal user={data} open={open} onClose={setOpen} />
      <Grid container columnSpacing={12} p='1rem 3rem 2rem 3rem'>
        <Grid container item xs={7.5} spacing={4} >
          <Grid item xs={12}>
            <Typography variant='tabTitle'>Checkout</Typography>
          </Grid>
          <Grid item xs={12} minHeight='100%'>
            <Box sx={item}>
              <Box sx={container}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant='title.primary'>
                    Shipping Address
                  </Typography>
                  <Button
                    onClick={() => setOpen(address ? 'address.update' : 'address.add')}
                    sx={button_style}
                    variant='outlined'
                    size='small'
                  >
                    {address ? 'Edit' : 'Add'}
                  </Button>
                </Box>
                <Box
                  sx={{
                    px: 4,
                    py: 3,
                    border: '1px solid var(--brand)',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                  }}
                >
                  {
                    !address ?
                      <Button onClick={() => setOpen('address.add')} sx={{ m: 'auto' }}>Add your address here</Button> :
                      <>
                        <Typography variant='paragraph' >{address.name}</Typography>
                        <Typography variant='body2' >{address.address}</Typography>
                        <Typography variant='body2' >{address.city + " " + address.state + " " + address.pincode}</Typography>
                        <Typography variant='body2' >{address.mobile}</Typography>
                      </>
                  }
                </Box>
              </Box>
              <Box sx={container}>
                <Typography sx={{ mr: 4 }} variant='title.primary'>
                  We Support
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center'
                  }}
                >
                  <Upi width={50} height={50} />
                  <Visa width={50} height={50} />
                  <Mastercard width={50} height={50} />
                </Box>
              </Box>
              <Box sx={container}>
                <Typography variant='title.primary'>
                  Product Summary
                </Typography>
                {
                  cart?.map(({ id, product, quantity }, key) =>
                    <Box sx={{ display: 'flex', gap: 4 }} key={id}>
                      <img className='img_border' width={80} height={80} src={product.images[0].url + '/tr:w-100'} alt="" />
                      <Box>
                        <Link to={`/shop/product/${product?.id}`}>
                          <Typography variant='paragraph'>{product.name}</Typography>
                        </Link>
                        <Typography fontWeight={700} fontSize={18}>Rs. {product.price * quantity}</Typography>
                      </Box>
                      {
                        cart?.[key + 1] &&
                        <Divider variant='fullWidth' />
                      }
                    </Box>
                  )
                }
              </Box>
            </Box>
          </Grid>
        </Grid >
        <CheckoutBox />
      </Grid >
    </>
  );
}

const CheckoutBox = () => {
  const setAlert = useStore(s => s.setAlert)
  const [loading, setLoading] = useState(false);
  const { currentUser: { data: user } } = useCurrentUser()
  const { cart } = useCart(user)
  const total_price = cart.data?.[1].total_price
  const total_discount = cart.data?.[1].total_discount

  async function handleRegistration() {
    if (!user?.default_address) {
      setAlert({
        message: `You should provide an address`,
        type: 'error',
        toggled: true,
      });
      return
    }
    
    setLoading(true)
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const transfers = {
      total_amount: 20000,
      accounts: [
        {
          account: '1321321',
          amount: 12000
        },
        {
          account: '89746541',
          amount: 8000
        },
      ]
    }

    const { data } = await axiosClient.post("/rzp/orders/purchase", { transfers: JSON.stringify(transfers) });

    if (!data) {
      alert("Server error. Are you online?");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      currency: data.currency,
      amount: data.amount?.toString(),
      order_id: data.id,
      name: 'Artworld',
      description: 'Artist registration',
      image: 'http://localhost:1337/logo.svg',
      callback_url: `${BASE_URL}/rzp/purchase/verify`,
      prefill: {
        name: user?.displayName,
        email: user?.email,
        phone_number: user?.default_address?.phone
      },
      config: {
        display: {
          hide: [
            {
              method: "wallet"
            },
            {
              method: "paylater"
            },
          ],
        }
      },
      "modal": {
        "ondismiss": function () {
          setLoading(false)
        }
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
    rzp.on('payment.failed', function (response) {
      setLoading(false)
      console.log(response);
    });
  }

  return (
    <>
      <Grid item xs position='sticky' top='2rem' alignSelf='flex-start'>
        <Box
          sx={{
            ...item,
            gap: 5,
            width: '100%',
            textAlign: 'center',
            bgcolor: 'var(--brandLight)',
            p: '4rem 3rem',
          }}
        >
          <Box
            sx={{
              display: "grid",
              justifyContent: 'center',
              textAlign: 'center',
              gap: 1,
            }}
          >
            <Typography variant='title.primary'>Sub total</Typography>
            <Typography fontSize={28} fontWeight={800}>₹{total_price - total_discount || 0}</Typography>
          </Box>
          <Divider />
          <Typography variant='subtitle2'>After clicking “Confirm Order”, you will be redirected to Razorpay to complete your purchase securely.</Typography>
          <LoadingButton fullWidth loading={loading} onClick={handleRegistration} variant='contained' size='large'>Confirm Order</LoadingButton>
          <Typography sx={{ mt: -1 }} variant='subtitle2' textAlign='center' mt={1}>All transactions are secure and encrypted.</Typography>
          {/* <a style={{ marginInline: 'auto' }} href="https://razorpay.com/" target="_blank" rel="noreferrer" > <img referrerPolicy="origin" src="https://badges.razorpay.com/badge-light.png " style={{ height: '45px', width: '113px' }} alt="Razorpay | Payment Gateway | Neobank" /></a> */}
        </Box>
      </Grid>
    </>
  )

}

export default Checkout