import { Button, Grid, Typography } from '@mui/material'
import react, { useEffect, useState } from 'react'
import AddNewAddress from '../Profile/AddNewAddress';
import AddIcon from '@mui/icons-material/Add';
import QuantityInput from '../QuantityInput/QuantityInput';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.min.css';
import { Mousewheel } from "swiper"
import { useStore } from '../../Context/Store';
import { useDatabase } from '../../Hooks/useDatabase';

function AddressCarousel() {
    const [open, setOpen] = useState(false)
    const defaultAddress = useStore(state => state.userData?.defaultAddress)
    const userAddressList = useStore(state => state.userData?.address)
    const { setDefaultAddress } = useDatabase()

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
            <div style={{marginLeft:'-2em'}}>
                <AddNewAddress open={open} close={() => setOpen(!open)} />
            </div>
            <div id="addressList">
                <Grid item xs={12} mb={4} ml={-4}>
                    <Typography variant="h5" sx={{ fontWeight: '800' }}>Payment info</Typography>
                </Grid>
                <Grid item xs={12} mb={2}>
                    <Typography {...style.typography}>Delivery address</Typography>
                </Grid>
                <Grid item gap={2} xs={
                    userAddressList ? userAddressList.length > 1 ? 12 : 6.85 : 1
                } display='flex'>
                    {
                        userAddressList &&
                        <Swiper
                            slidesPerView={
                                userAddressList.length > 1 ? 2 : 1
                            }
                            spaceBetween={15}
                            mousewheel={true}
                            modules={[Mousewheel]}
                            className="checkout_swiper"
                            initialSlide={(userAddressList?.reverse()).map((data, index) => data.id === defaultAddress.id && index).find(o => o !== false)}
                        >
                            {
                                userAddressList?.map((address, index) =>
                                    <SwiperSlide key={index}>
                                        <div
                                            className="checkout__address"
                                            onClick={() => setDefaultAddress(address)}
                                            style={
                                                {
                                                    transform: address.id === defaultAddress.id && 'translate(-4px,-4px)',
                                                    boxShadow: address.id === defaultAddress.id && '8px 8px 10px 2px var(--shadow)'
                                                }
                                            }>
                                            {
                                                address.id === defaultAddress.id &&
                                                <div className="checkout__address--checked">
                                                    <CheckCircleIcon sx={{ color: 'var(--brand)', fontSize: '25px' }} />
                                                </div>
                                            }
                                            <Typography variant='h5' fontSize={15}>{address.name}</Typography>
                                            <Typography variant='h3' color='ThreeDDarkShadow' lineHeight={1.3} fontSize={13}>{address.address} {address.postalCode}</Typography>
                                            <Typography>{address.phoneNumber}</Typography>
                                        </div>
                                    </SwiperSlide>
                                )
                            }
                        </Swiper>
                    }
                    <Button disabled={open} variant='contained' onClick={() => setOpen(!open)} sx={
                        {
                            borderRadius: '10px',
                            minWidth: '100px',
                            height: '100px',
                            margin: 'auto',
                            boxShadow: 'none',
                            background: 'lightgrey',
                            '&:hover': {
                                boxShadow: 'none',
                                background: '#999999',
                            }
                        }
                    }><AddIcon fontSize='large' />
                    </Button>
                </Grid>
            </div>
        </>
    )
}

export default AddressCarousel