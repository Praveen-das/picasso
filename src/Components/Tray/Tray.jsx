import React from 'react'
import './tray.css'
import { useProductQuery } from '../../Hooks/useProducts'
import { Box, Button, Chip, IconButton, Typography } from '@mui/material';
import { Carousal } from '../Carousal/Carousal';
import { Link } from 'react-router-dom';
import BackwardIcon from '@mui/icons-material/ArrowBackIosRounded';
import ForwardIcon from '@mui/icons-material/ArrowForwardIosRounded';
import styled from '@emotion/styled';

const IconBtn = styled((props) => <IconButton size='small' {...props} />)({
    background: '#e2e2e2',
    ":hover": {
        background: '#e2e2e2',
    }
})

function Tray({ title, filters, url, link }) {
    const { data } = useProductQuery(title, url)

    return (
        <Box
            sx={{
                height: 350,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 'var(--vSpacing)',
                px: 6,
                overflow: 'hidden'
            }}
        >
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Box display='flex' alignItems='center' gap={2}>
                    <Typography variant='heading' >{title}</Typography>
                    <Button sx={{ textTransform: 'none', borderRadius: 3,px:2 }} variant='contained' size='small'>View all</Button>
                </Box>
                <Box display='flex' gap={0.6} sx={{ translate: '20px 0' }}>
                    <IconBtn >
                        <BackwardIcon sx={{ fontSize: 16 }} />
                    </IconBtn>
                    <IconBtn >
                        <ForwardIcon sx={{ fontSize: 16 }} />
                    </IconBtn>
                </Box>
            </Box>
            <Carousal data={data} />
        </Box>
    )
}

export default Tray