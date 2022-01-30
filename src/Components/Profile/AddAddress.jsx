import React, { useState } from 'react';
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import InputField from '../TextField/InputField'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useFirebase } from '../../Context/FirebaseContext';

function AddAddress({open,setOpen}) {
    const { addUserAddress } = useFirebase()
    const [address, setAddress] = useState()

    const box_style = {
        boxSizing:'border-box',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        borderRadius: 0,
        boxShadow: 5,
        gap:2,
        p:'3rem 2rem'
    };

    const handleSubmit = async () => {
        await addUserAddress(address)
        setOpen(false)
    }

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={box_style}>
                    <Typography textAlign='center' mb={1} variant='h5'>New Address</Typography>
                    <InputField onChange={(e) => setAddress(pre => {
                        return { ...pre, name: e.target.value }
                    })} size='large' label='Full name' />
                    <InputField onChange={(e) => setAddress(pre => {
                        return { ...pre, address: e.target.value }
                    })} size='large' rows={5} label='Residential address' />
                    <InputField onChange={(e) => setAddress(pre => {
                        return { ...pre, postalCode: e.target.value }
                    })} size='large' label='Postal code' />
                    <InputField onChange={(e) => setAddress(pre => {
                        return { ...pre, phoneNumber: e.target.value }
                    })} size='large' label='Phone number' />
                    <Button onClick={handleSubmit} variant='contained' sx={{ marginTop: 3 }}>Add</Button>
                </Box>
            </Modal>
        </>
    )
}

export default AddAddress;
