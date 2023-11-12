import React from 'react'
import './tray.css'
import { useProductQuery } from '../../Hooks/useProducts'
import { Box, Button, Typography } from '@mui/material';
import { Carousal } from '../Carousal/Carousal';
import { useNavigate } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/East';
import ArrowLeftAltIcon from '@mui/icons-material/West';


function Tray({ title, url, direction = 'ltr' }) {
    const { data = [] } = useProductQuery(title, url)

    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/shop?orderBy=%7B"createdAt"%3A"desc"%7D')
    }

    let containerStyle = {
        ltr: {
            flexDirection: 'row'
        },
        rtl: {
            flexDirection: 'row-reverse'
        }
    }

    let cta_btn_props = {
        ltr: { endIcon: <ArrowRightAltIcon /> },
        rtl: { startIcon: < ArrowLeftAltIcon /> }

    }

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: 300,
                display: 'flex',
                gap: 8,
                my: 'var(--vSpacing)',
                px: 4,
                // overflow: 'hidden',
                ...containerStyle[direction],
                boxSizing: 'border-box'
            }}
        >
            {/* <span className='bluredBlob'/> */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: 'black',
                    alignItems: 'flex-start',
                    gap: 4
                }}
            >
                <Typography variant='heading' >{title}</Typography>
                <Typography variant='subtitle1' >Discover, Buy and Sell Masterpieces Inspired by Culture and Talent</Typography>
                <Button
                    onClick={handleNavigate}
                    variant='contained'
                    sx={{
                        fontWeight: 600,
                        mt: 4,
                        px: 3,
                        backgroundImage: 'linear-gradient(90deg, rgb(91 49 255), rgb(174 39 255))',
                    }}
                    {...cta_btn_props[direction]}
                >View all</Button>
            </Box>
            <Carousal data={data} />
        </Box>
    )
}

export default Tray