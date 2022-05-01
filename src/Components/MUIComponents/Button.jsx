import React from 'react'
import Button from '@mui/material/Button'
import { CircularProgress } from '@mui/material'


function CustomButton({ loading, children, variant, ...rest }) {
    return (
        <>
            <Button
                variant={variant || 'contained'}
                sx={{
                    marginLeft: 'auto',
                    height: 40,
                    maxWidth: { md: 150 },
                    float: 'right',
                    transform: 'translateY(5px)',
                    whiteSpace: 'nowrap',
                }}
                {...rest}
            >
                {
                    !loading ? children : <CircularProgress size={20} color='inherit' />
                }
            </Button>
        </>
    )
}

export default CustomButton