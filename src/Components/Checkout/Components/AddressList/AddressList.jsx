import React, { useState } from 'react'
import Radio from '@mui/material/Radio';
import './addresslist.css'
import useCurrentUser from '../../../../Hooks/useCurrentUser';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useRef } from 'react';
import AddNewAddress from '../../../Profile/AddNewAddress'

function AddressList({ setAddress }) {
    const [value, setValue] = useState(0)

    const {
        currentUser,
    } = useCurrentUser();

    const { address } = currentUser.data || { address: [] }

    useEffect(() => {
        setAddress(!!address.length && address[value])
    }, [value, address])

    return (
        <>
            
            {
                address.map((data, index) => (
                    <div key={data.id} className="addressList">
                        <Radio
                            checked={value === index}
                            onChange={() => setValue(index)}
                            value="a"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <Address data={data} onClick={() => setValue(index)} />
                    </div>
                ))
            }
        </>
    );
}

export function Address({ data, onClick }) {
    const address = useRef()

    const handleClick = () => onClick()

    useEffect(() => {
        address.current.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    return (
        <Box
            ref={address}
            sx={{
                width: '100%',
                padding: '8px 1rem',
                boxShadow: '2px 2px 5px 2px var(--shadow)',
                borderRadius: 2,
                transform: 'translate(0, 0)'
            }}>
            <Typography variant='h6' fontSize={15} fontWeight={600} lineHeight={1.5}>{data.name}</Typography>
            <Typography variant='body2' >{data.address + ' ' + data.city + ' ' + data.state + ' ' + data.pincode}</Typography>
            <Typography variant='body2' >{data.email}</Typography>
            <Typography variant='body2' >{data.mobile}</Typography>
        </Box>
    )
}

export default AddressList