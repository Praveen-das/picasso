import { Box, CircularProgress } from '@mui/material'
import React from 'react'

function LoadingScreen() {
    return (
        <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <CircularProgress size={60} />
        </Box>
    )
}

export default LoadingScreen