import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import axiosClient from '../../../lib/axiosClient';
import useCurrentUser from '../../../Hooks/useCurrentUser';

import '../style.css'
import { _updateUser } from '../../../Services/user.api';
import useRzp from '../../../Hooks/useRzp';
import { loadScript } from '../../../Utils/utils';

const faqs = [
    {
        question: 'Lorem adipisicing elit. Non, quos?',
        answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas sit ducimus fugit sed, omnis enim corporis nam neque libero ipsam eligendi temporibus minus cumque assumenda non incidunt! Nesciunt, quos minima!'
    },
    {
        question: 'Lorem ipsum doloonsectetur adipisicing elit. Non, quos?',
        answer: 'Lorem ipsum  enim corporis nam neque libero ipsam eligendi temporibus minus cumque assumenda non incidunt! Nesciunt, quos minima!'
    },
    {
        question: 'Loreor sit amet consectetur ading elit. Non, quos?',
        answer: 'Lorem ipsum dolor sit amet consecit. Voluptas sit ducimus fugit sed, omnis enim corporis nam neque libero ipsam eligendi temporibus minus cumque assumenda non incidunt! Nesciunt, quos minima!'
    },
    {
        question: 'Lorem ipsum dolor sit amet consectetuit. Non, quos?',
        answer: 'Lorem ipsum dolor sitt sed, omnis enim corporis nam neque libero ipsam eligendi temporibus minus cumque assumenda non incidunt! Nesciunt, quos minima!'
    },
    {
        question: 'Lorem ipsum dolor sur adipisicing elit. Non, quos?',
        answer: 'Lorem ipsum dolor sit amet consecteturuptas sit ducimus fugit sed,s nam neque libero ipsam eligendi temporibus minus cumque assumenda non incidunt! Nesciunt, quos minima!'
    },
]

export default function SellerRegistraton() {
    const { currentUser: { data: user, isLoading, isFetching }, updateUser } = useCurrentUser()
    const { verifyPayment } = useRzp()

    async function handleRegistration() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const { data } = await axiosClient.post("/rzp/orders/registration");

        if (!data) {
            alert("Server error. Are you online?");
            return;
        }

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: 'Artworld',
            description: 'Artist registration',
            image: 'http://localhost:1337/logo.svg',
            callback_url: 'http://localhost:3001/rzp/registration/verify',
            prefill: {
                name: 'praveen das',
                email: 'sdfdsjfh2@ndsfdf.com',
                phone_number: '8848990353'
            }
        }

        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    return (
        <>
            {
                isLoading ||
                    isFetching ?
                    <Typography variant='h5'>loading....</Typography> :
                    <Grid container columnSpacing={8} height='100%' px={10} pt={4} pb={6} >
                        <Grid item xs={7} height='100%' >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                boxSizing: 'border-box',
                                gap: 4,
                                height: '100%',
                            }}>
                                <Typography variant='heading' >Start Selling</Typography>
                                <Typography variant='paragraph' >
                                    Unlock Your Artistic Potential. Join as a Seller on our platform and showcase your paintings to art lovers worldwide. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo esse eligendi aliquid aut atque fuga est, consequuntur impedit rem at!
                                </Typography>
                                {/* <Button onClick={handleRegistration} sx={{ borderRadius: 4, px: 4, py: 1, textTransform: 'none' }} size='large' variant='contained'>Register Now</Button> */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        mt: 4
                                    }}
                                >
                                    <Typography variant='heading' fontSize={20}>Artist FAQ</Typography>
                                    <Divider />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4
                                        }}
                                    >
                                        {
                                            faqs.map(({ question, answer }, key) => (
                                                <Box
                                                    key={key}
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 1
                                                    }}
                                                >
                                                    <Typography fontWeight={600}>{question}</Typography>
                                                    <Typography>{answer}</Typography>
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                </Box>

                            </Box>
                        </Grid>
                        <Grid item xs >
                            <Box
                                className='subscriptionBox'
                                sx={{
                                    position: 'sticky',
                                    alignSelf: 'start',
                                    top: 'var(--header)',
                                    boxSizing: "border-box",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: "350px",
                                    boxShadow: '0 20px 20px #00000045',
                                    borderRadius: '10px',
                                    ml: 'auto',
                                    px: 3,
                                    py: 3,
                                    gap: 2
                                }}
                            >
                                <Typography sx={{ mt: 3, mb: -1 }} fontSize={36} fontWeight={700}>₹ 799</Typography>
                                <Typography variant='subtitle2'>You will get</Typography>
                                <ul>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                </ul>
                                <Button onClick={handleRegistration} sx={{ mt: 2 }} size='large' variant='contained' >Register Now</Button>
                                <Typography variant='subtitle2'>* Terms and conditions</Typography>
                            </Box>
                        </Grid>
                    </Grid>
            }
        </>
    )
}
