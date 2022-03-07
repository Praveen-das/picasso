import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

function Address({ data }) {
    
    return (
        <>
            <Grid item xs={12} display='flex' justifyContent='center' pb={1}>
                <Box sx={{ width: '100%', border: '1px dashed #ccc', padding: '5px 1rem', borderRadius: 0.8 }}>
                    <Typography variant='h6' lineHeight={2}>{data.name}</Typography>
                    <Typography variant='body2' >{data.address}</Typography>
                    <Typography variant='body2' >{data.postalCode}</Typography>
                    <Typography variant='body2' >{data.phoneNumber}</Typography>
                </Box>
            </Grid>
        </>
    )
}

export default Address
