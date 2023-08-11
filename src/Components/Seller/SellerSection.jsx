import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import ArrowIcon from '@mui/icons-material/ArrowForward';
import { ReactComponent as RegisterIcon } from '../../Assets/svg/register.svg'
import { ReactComponent as SellIcon } from '../../Assets/svg/sales.svg'
import { ReactComponent as PurchaseIcon } from '../../Assets/svg/purchase.svg'
import { ReactComponent as PaymentIcon } from '../../Assets/svg/payment.svg'

export default function SellerSection() {
    const seller_step_item = {
        display: 'grid',
        placeItems: 'center',
        gap: 2,
        textAlign: 'center'
    }
    const ts = {
        fontSize: 14,
        fontWeight: 700
    }
    const style = {
        translate: '0 -20px'
    }
    const iconSize = {
        height: 60, width: 60,
    }
    return (
        <Grid container spacing={4} px={6} py={8} >
            <Grid item xs={6} >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 2,
                    height: '100%',
                }}>
                    <Typography variant='heading' >BECOME A SELLER</Typography>
                    <Typography variant='desc'>
                        Unlock Your Artistic Potential. Join as a Seller on our platform and showcase your paintings to art lovers worldwide. Connect with a vibrant community of artists and turn your passion into profit. Start selling your art today with Artworld, your gateway to artistic success.
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={6} >
                <Box
                    sx={{
                        boxSizing: 'border-box',
                        display: 'grid',
                        placeItems: 'center',
                        width: '100%',
                        bgcolor: 'var(--brandLight)',
                        borderRadius: 10,
                        gap: 4,
                        p: 4
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Box sx={seller_step_item}>
                            <RegisterIcon {...iconSize} />
                            <Typography {...ts} >Register<br />Your Account</Typography>
                        </Box>
                        <ArrowIcon style={style} />
                        <Box sx={seller_step_item}>
                            <SellIcon {...iconSize} />
                            <Typography {...ts} >Showcase Your<br />Artwork</Typography>
                        </Box>
                        <ArrowIcon style={style} />
                        <Box sx={seller_step_item}>
                            <PurchaseIcon {...iconSize} />
                            <Typography {...ts} >Buyer<br />Purchase</Typography>
                        </Box>
                        <ArrowIcon style={style} />
                        <Box sx={seller_step_item}>
                            <PaymentIcon {...iconSize} />
                            <Typography {...ts} >Receive<br />Payment</Typography>
                        </Box>
                    </Box>
                    <Button sx={{ borderRadius: 4, px: 4, py: 1.5, textTransform: 'none' }} size='large' variant='contained'>Register Now</Button>
                </Box>
            </Grid>
        </Grid>
    )
}
