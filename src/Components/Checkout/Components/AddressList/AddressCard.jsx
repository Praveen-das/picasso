import React from 'react'
import './addresslist.css'
import { Box, Typography } from '@mui/material';

export default function AddressCard({ data, onClick }) {

    return (
        <Box
            sx={{
                p: 2,
                border: '2px solid var(--brandLight)',
                borderRadius: '10px'
            }}
        >
            {
                true ?
                    <></> :
                    <>
                        <Typography variant='h6' fontSize={15} fontWeight={600} lineHeight={1.5}>{data.name}</Typography>
                        <Typography variant='body2' >{data.address}</Typography>
                        <Typography variant='body2' >{data.city + " " + data.state + " " + data.pincode}</Typography>
                        <Typography variant='body2' >{data.mobile}</Typography>
                    </>
            }
        </Box>
    )
}