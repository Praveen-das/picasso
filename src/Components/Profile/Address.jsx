import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Address({ data, onClick, isDefault }) {

    const addressStyling = () => {
        if (isDefault)
            return {
                sx: {
                    width: '100%',
                    padding: '5px 1rem',
                    boxShadow: '4px 4px 7px 2px var(--shadow)',
                    borderRadius: 2,
                    transform: 'translate(0, -2px)'
                }
            }
        return {
            sx: {
                width: '100%',
                padding: '5px 1rem',
                boxShadow: '2px 2px 5px 2px var(--shadow)',
                borderRadius: 2,
                transform: 'translate(0, 0)'
            }
        }
    }

    return (
        <div onClick={onClick} style={{ cursor: 'pointer', position: 'relative' }}>
            {
                isDefault &&
                <CheckCircleIcon color='primary' sx={{ position: 'absolute', top: '-10px', right: '-10px', background: 'white', padding: 0, zIndex: 100,borderRadius:20 }} />
            }
            <Grid item xs={12} display='flex' justifyContent='center' pb={2} ml={{ sm: 2 }}>
                <Box {...addressStyling()}>
                    <Typography variant='h6' fontSize={15} fontWeight={600} lineHeight={1.5}>{data.name}</Typography>
                    <Typography variant='body2' >{data.address1}</Typography>
                    {data.address2 && <Typography variant='body2' >{data.address2}</Typography>}
                    <Typography variant='body2' >{data.pincode}</Typography>
                    <Typography variant='body2' >{data.phoneNumber}</Typography>
                </Box>
            </Grid>
        </div>
    )
}

export default Address
