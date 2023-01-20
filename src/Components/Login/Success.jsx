import { Box, Button, Fade, Modal, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import successvdo from '../../Assets/success.mp4'

function Success({ open, setOpen }) {
    const navigate = useNavigate()

    const style = {
        boxSizing: 'borderBox',
        position: 'absolute',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: '4em 2em',
        gap: 2,
        outline: 'none'
    }

    return (
        <Modal
            open={open}
            onClose={() => navigate('/')}
            closeAfterTransition
            sx={{ background: 'white' }}
            // hideBackdrop
        >
            <Fade in={open}>
                <Box sx={style} >
                    <video autoPlay width={160} height={160} src={successvdo} alt="" />
                    <Typography variant='h5' fontSize='1.5rem'>CONGRATULATIONS</Typography>
                    <Typography lineHeight={1.4} variant='h2' fontSize={18}>Your account has been successfully created. Continue by loging in</Typography>
                    <Button
                        type="submit"
                        size="large"
                        sx={{
                            background: "var(--brandGradient)",
                            borderRadius: "50px",
                            fontSize: "12px",
                            width: "200px",
                            mt: '1rem'
                        }}
                        variant="contained"
                        onClick={() => setOpen(false)}
                    >
                        Continue
                    </Button>
                </Box>
            </Fade>
        </Modal>
    )
}

export default Success