import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import successvdo from '../../Assets/success.mp4'

function Success({ callback }) {
    return (
        <Box width={350} display='grid' justifyItems='center' textAlign='center' p='0 2rem' gap='1rem' mt='-1rem' >
            <video autoPlay width={160} height={160} src={successvdo} alt="" />
            <Typography variant='h5' fontSize='1.5rem'>CONGRATULATIONS</Typography>
            <Typography lineHeight={1.4} variant='h2' fontSize={18}>Your account has been successfully created. Continue to login page</Typography>
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
                onClick={callback}
            >
                Continue
            </Button>
        </Box>
    )
}

export default Success