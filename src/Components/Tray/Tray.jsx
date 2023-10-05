import React from 'react'
import './tray.css'
import { useProductQuery } from '../../Hooks/useProducts'
import { Box, Button, Chip, Grid, IconButton, Typography } from '@mui/material';
import { Carousal } from '../Carousal/Carousal';
import { useNavigate } from 'react-router-dom';


function Tray({ title, url }) {
    const { data = [] } = useProductQuery(title, url)

    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/shop?orderBy=%7B"createdAt"%3A"desc"%7D')
    }

    return (
        <Box
            sx={{
                position: 'relative',
                height: 250,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 'var(--vSpacing)',
                px: 4,
                overflow: 'hidden',
                boxSizing: 'border-box'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: 'black',
                    alignItems: 'flex-end',
                }}
            >
                <Typography variant='heading' >{title}</Typography>
                <Button onClick={handleNavigate} sx={{ fontWeight: 600 }} size='small' color='inherit'>View all</Button>
            </Box>
            <Carousal data={data} />
        </Box>
    )
}

export default Tray