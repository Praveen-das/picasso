import { Box, Button, Fade, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as SuccessSVG } from '../../Assets/svg/success.svg'

function PurchaseSuccess() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)

    const style = {
        boxSizing: 'border-box',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: '0 15px 40px var(--brandLight)',
        p: '3em 3em',
        gap: 2,
        outline: 'none',
        borderRadius: '30px'
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'grid',
                placeItems: 'center'
            }}
        >
            <Box sx={style} >
                <SuccessSVG height={250} style={{ marginTop: '-4rem' }} />
                <Typography variant='title.primary' sx={{ textTransform: 'none' }} fontSize='1.5rem'>Your Payment is Successfull</Typography>
                <Typography variant='paragraph'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita sequi voluptas libero, aliquid omnis doloribus.</Typography>
                <Button
                    type="submit"
                    size="large"
                    sx={{
                        background: "var(--brandGradient)",
                        borderRadius: "50px",
                        mt: 2
                    }}
                    variant="contained"
                    onClick={() => navigate('/shop')}
                >Continue shopping</Button>
            </Box>
        </Box>
    )
}

export default PurchaseSuccess