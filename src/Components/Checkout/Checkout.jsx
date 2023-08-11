import React, { useState } from 'react'
import './checkout.css'

import { Box, Grid,Button, Typography, Step, StepLabel, StepContent, Paper, Stepper } from '@mui/material';
import AddressList, { Address } from './Components/AddressList/AddressList';
import PaymentMethod from './Components/PaymentMethod/PaymentMethod';
import Products from './Components/Products/Products';
import { useCart } from '../../Hooks/useCart';
import AddNewAddress from '../Profile/ManageAddress/AddNewAddress';
import useSales from '../../Hooks/Sales/useSales';

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState({});
  const [method, setMethod] = useState('card');
  const [open, setOpen] = useState(false)

  const { createOrder } = useSales()
  const { cart } = useCart()

  const handleNext = () => {
    setActiveStep((pre) => pre + 1);
  };
  
  const handleBack = () => {
    setActiveStep((pre) => pre - 1);
  };

  const handleOrder = () => {
    createOrder.mutateAsync({
      method,
      cart_items: cart.data[0]
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  };

  return (
    <Grid container spacing={2} p='1rem 4rem'>
      <Grid item xs={8}>
        <Box maxWidth={750}>
          <Stepper activeStep={activeStep} orientation="vertical" >
            <Step>
              <StepLabel>
                <Typography variant='subtitle1' fontWeight={800} color={activeStep === 0 ? 'var(--brand)' : 'var(--brandMain)'}>
                  {open ? 'Add Shipping Address' : activeStep === 0 ? 'Select a delivery address' : 'Delivery Address'}
                </Typography>
              </StepLabel>
              <Box display={activeStep === 0 && 'none'}>
                <div className="addressList">
                  <Address data={address} />
                </div>
              </Box>
              <StepContent >
                <Box sx={{ mt: 1.5 }}>
                  {
                    open ? <AddNewAddress open={open} close={() => setOpen(false)} /> :
                      <AddressList setAddress={setAddress} />
                  }
                </Box>
                <Box display={open && 'none'} sx={{ mb: 1 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        mt: 3,
                        mr: 1,
                        p: '10px 20px',
                        borderRadius: '100px',
                        fontSize: '0.8rem'
                      }}
                    >
                      Use this address
                    </Button>
                    <Button
                      onClick={setOpen}
                      sx={{ mt: 3, mr: 1, p: '10px 20px', }}
                    >
                      New Address
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>
                <Typography variant='subtitle1' fontWeight={800} color={activeStep === 1 ? 'var(--brand)' : 'var(--brandMain)'}>
                  {activeStep === 1 ? 'Select a payment method' : 'Payment method'}
                </Typography>
              </StepLabel>
              <StepContent>
                <Box sx={{ mt: 1.5 }}>
                  <PaymentMethod method={method} setMethod={setMethod} />
                </Box>
                <Box sx={{ mb: 1 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        mt: 3,
                        mr: 1,
                        p: '10px 20px',
                        borderRadius: '100px',
                        fontSize: '0.8rem'
                      }}
                    >
                      Use this method
                    </Button>
                    <Button
                      onClick={handleBack}
                      sx={{ mt: 3, mr: 1, p: '10px 20px', }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>
                <Typography variant='subtitle1' fontWeight={800} color={activeStep === 2 ? 'var(--brand)' : 'var(--brandMain)'}>
                  {activeStep === 2 ? 'Review items and delivery' : 'Items and delivery'}
                </Typography>
              </StepLabel>
              <StepContent>
                <Box sx={{ mt: 1.5 }}>
                  <Products />
                </Box>
              </StepContent>
            </Step>
          </Stepper>
          {activeStep === 2 && (
            <Paper square elevation={0} sx={{ mt: 2 }}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button variant='contained' onClick={handleOrder} sx={{ mt: 4, mr: 1 }}>
                Place order
              </Button>
            </Paper>
          )}
        </Box>
      </Grid>
      
      {/* <Grid item xs={12} m='1.5rem 0 0 1.4rem'>
                            <Typography {...style.typography}>Payment options</Typography>
                        </Grid>
                        <div className="checkout__method">
                            <div>
                                <input defaultChecked={true} onChange={() => setPaymentMethod('card')} name='payment' type="radio" />
                                <CreditCardIcon sx={{ fontSize: '18px' }} />
                                <label >Credit card/Debit card</label>
                            </div>
                            <div>
                                <input onChange={() => setPaymentMethod('cod')} name='payment' type="radio" />
                                <LocalShippingIcon sx={{ fontSize: '18px' }} />
                                <label >COD</label>
                            </div>
                        </div> */}
    </Grid>
  );
}

export default Checkout