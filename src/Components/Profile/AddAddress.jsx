import React, { useState } from 'react';
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import InputField from '../TextField/InputField'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDatabase } from '../../Hooks/useDatabase';
import { ReactComponent as Address } from '../../Assets/Images/address.svg'

function AddAddress({ open, setOpen }) {
    const { addUserAddress } = useDatabase()
    const [address, setAddress] = useState()

    const box_style = {
        boxSizing: 'border-box',
        display: 'flex',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        borderRadius: 0,
        boxShadow: 5,
        gap: 2,
        padding:'3rem 3rem'
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
                    <div style={{ position: 'absolute', top: 0, bottom: 0, display: 'grid', placeItems: 'center' }}>
                        <Address width={250}/>
                    </div>
                    <div style={{ marginLeft: 'auto', width: 300 }}>
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
                        <Button fullWidth onClick={handleSubmit} variant='contained' sx={{ marginTop: 3 }}>Add</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default AddAddress;
