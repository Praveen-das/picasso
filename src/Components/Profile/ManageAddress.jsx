import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useFirebase } from '../../Context/FirebaseContext';
import Address from './Address';
import AddAddress from './AddAddress';

function ManageAddress() {
    const { userData } = useFirebase()
    const [open, setOpen] = useState(false)
    
    return (
        <>
            <AddAddress open={open} setOpen={setOpen}/>
            <Grid item xs={12} display='flex' justifyContent='center' mb={2}>
                <Button onClick={() => setOpen(true)}><AddIcon />Add New Address</Button>
            </Grid>
            {
                userData && userData.address ? userData.address.map((user, index) =>
                    <Address data={user} />
                ) :
                <Grid item xs={12} display='flex' justifyContent='center' pb={1}>
                    <Box sx={{ width: '100%', height:'5px', border: '1px solid #ccc', padding: 2, borderRadius: 0.8 }}/>
                </Grid>
            }
        </>
    )
}

export default ManageAddress
