import { Button, Grid, Typography } from '@mui/material'
import react, { useEffect, useState } from 'react'
import AddNewAddress from '../Profile/AddNewAddress';
import AddIcon from '@mui/icons-material/Add';
import QuantityInput from '../QuantityInput/QuantityInput';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.min.css';
import { Mousewheel } from "swiper"
import useCurrentUser from '../../Hooks/useCurrentUser';

function AddressCarousel() {
    const [open, setOpen] = useState(false)
    const { currentUser, updateUser } = useCurrentUser()

    const { address, default_address } = currentUser.data

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
            <div style={{ marginLeft: '-2em' }}>
                {
                    open &&
                    <AddNewAddress open={open} close={() => setOpen(!open)} />
                }
            </div>
            <div id="addressList">
                <Grid item xs={12} mb={2}>
                    <Typography {...style.typography}>Delivery address</Typography>
                </Grid>
                <Grid
                    item
                    gap={2}
                    xs={
                        !!address.length ?
                            address.length > 1 ?
                                12 :
                                6.85 : 1
                    }
                    display='flex'
                >
                    {
                        !!address.length &&
                        <Swiper
                            slidesPerView={
                                address.length > 1 ? 2.1 : 1
                            }
                            spaceBetween={15}
                            mousewheel={true}
                            modules={[Mousewheel]}
                            className="checkout_swiper"
                            initialSlide={address?.map((data, index) => data.id === default_address && index).find(o => o !== false)}
                        >
                            {
                                address?.map((address, index) =>
                                    <SwiperSlide key={index}>
                                        <div
                                            className="checkout__address"
                                            onClick={() => updateUser({ default_address: address.id })}
                                            style={
                                                {
                                                    transform: address.id === default_address && 'translate(-4px,-4px)',
                                                    boxShadow: address.id === default_address && '8px 8px 10px 2px var(--shadow)'
                                                }
                                            }>
                                            {
                                                address.id === default_address &&
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