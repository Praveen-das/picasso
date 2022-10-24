import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Address from './Address';
import { useStore } from '../../Context/Store';
import { Typography } from '@mui/material';
import { useDatabase } from '../../Hooks/useDatabase';
import AddNewAddress from './AddNewAddress';

function ManageAddress() {
    const { setDefaultAddress } = useDatabase()
    var userAddress = useStore((state) => state.userData?.address)
    var defaultAddress = useStore((state) => state.userData?.defaultAddress)

    const [open, setOpen] = useState(false)

    return (
        <>
            <Grid item xs={12}>
                <AddNewAddress open={open} close={() => setOpen(!open)} />
                <Grid item xs={12} mb={2}>
                    <Typography variant='h5' fontWeight={800} color='#333'>Shipping Address</Typography>
                </Grid>
                {
                    !open &&
                    <Grid item xs={12} mb={2} ml={{ sm: 2 }}>
                        <Button sx={{ justifyContent: 'left', gap: 2 }} fullWidth size='large' onClick={() => setOpen(!open)}>
                            <AddIcon />
                            Add New Address
                        </Button>
                    </Grid>
                }
                {
                    userAddress ? userAddress.map((data, index) =>
                        <Address isDefault={data.id === defaultAddress.id} onClick={() => setDefaultAddress(data)} key={index} data={data} />
                    ) :
                        <Grid item xs={12} display='flex' justifyContent='center' pb={1} ml={{ sm: 2 }}>
                            <Box sx={{ width: '100%', height: '5px', boxShadow: '5px 5px 10px 0px var(--shadow)', padding: 2, borderRadius: 2 }} />
                        </Grid>
                }
            </Grid>
        </>
    )
}

export default ManageAddress