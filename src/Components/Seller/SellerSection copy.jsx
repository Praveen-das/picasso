import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import ArrowIcon from '@mui/icons-material/ArrowDownward';
import { ReactComponent as RegisterIcon } from '../../Assets/svg/register.svg'
import { ReactComponent as SellIcon } from '../../Assets/svg/sales.svg'
import { ReactComponent as PurchaseIcon } from '../../Assets/svg/purchase.svg'
import { ReactComponent as PaymentIcon } from '../../Assets/svg/payment.svg'
import axiosClient from '../../lib/axiosClient';
import { useQueryClient } from '@tanstack/react-query';

function loadScript(src) {
    if (window.Razorpay) return true
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export default function SellerSection() {
    const queryClient = useQueryClient();

    const seller_step_item = {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        justifySelf: 'left'
    }
    const ts = {
        fontSize: 14,
        fontWeight: 700
    }
    const iconSize = {
        height: 60, width: 60,
    }

    async function handleRegistration() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axiosClient.post("/rzp/subscriptions/create");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { id: subscription_id } = result.data;

        const options = {
            "key": process.env.RAZORPAY_KEY_ID,
            "subscription_id": subscription_id,
            "name": "Acme Corp.",
            "description": "2 Year Subscription Plan",
            "image": "/your_logo.jpg",
            "handler": (response) => {
                
            },
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210"
            },
            "notes": {
                "note_key_1": "Tea. Earl Grey. Hot",
                "note_key_2": "Make it so."
            },
            "theme": {
                "color": "#6e32f1"
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <Grid container spacing={8} px={12} py={1} height={'100%'}>
            <Grid item xs={6} lg={7} display='grid' alignItems='center' >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: 4,
                }}>
                    <Typography fontWeight={800} variant='h3' >Start selling now</Typography>
                    <Typography lineHeight={2} fontWeight={600} variant='h6' >
                        Unlock Your Artistic Potential. Join as a Seller on our platform and showcase your paintings to art lovers worldwide.
                    </Typography>
                    <Button onClick={handleRegistration} sx={{ borderRadius: 4, px: 8, py: 2, textTransform: 'none', mt: 4 }} size='large' variant='contained'>Register Now</Button>
                    <Box
                        sx={{
                            display: 'grid',
                            justifySelf: 'left',
                            gap: 1
                        }}
                    >
                        <Typography variant='subtitle2'>* Registration fee, Valid for 2 Years - ₹ 799 (Including Taxes)</Typography>
                        <Typography variant='subtitle2'>* Terms and conditions</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs >
                <Box
                    sx={{
                        boxSizing: 'border-box',
                        p: 6,
                        px: 8,
                        bgcolor: 'var(--brandLight)',
                        borderRadius: 20,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            mx: 'auto',
                            width: 'max-content',
                            gap: 2,
                        }}
                    >
                        <Box sx={seller_step_item}>
                            <RegisterIcon {...iconSize} />
                            <Typography {...ts} >Register Your Account</Typography>
                        </Box>
                        <ArrowIcon sx={{ mx: 'auto' }} />
                        <Box sx={seller_step_item}>
                            <SellIcon {...iconSize} />
                            <Typography {...ts} >Showcase Your Artwork</Typography>
                        </Box>
                        <ArrowIcon sx={{ mx: 'auto' }} />
                        <Box sx={seller_step_item}>
                            <PurchaseIcon {...iconSize} />
                            <Typography {...ts} >Buyer Purchase</Typography>
                        </Box>
                        <ArrowIcon sx={{ mx: 'auto' }} />
                        <Box sx={seller_step_item}>
                            <PaymentIcon {...iconSize} />
                            <Typography {...ts} >Receive Payment</Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
