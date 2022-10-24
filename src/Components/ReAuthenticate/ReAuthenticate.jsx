import {
    Box, Grid, Typography, TextField, Button, Modal
    , Checkbox
} from '@mui/material'

import React, { useRef, useState } from 'react'
import './style.css'
import { handleExceptions } from '../../Hooks/useExceptionHandler'
import AlertBox from '../MUIComponents/AlertBox/AlertBox'
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'

function ReAuthenticate({ reAuthenticateUser }) {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const email = useRef()
    const password = useRef()

    const box_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 5,
        p: '3rem 2rem',
        zIndex: 100
    };

    const handleReAuthentication = () => {
        setError(false)
        setLoading(true)
        reAuthenticateUser(email.current?.value, password.current?.value)
            .then(() => setLoading(false))
            .catch(error => {
                setLoading(false)
                setError(handleExceptions(error))
            })
    }

    const textFieldProps = {
        variant: 'standard',
        fullWidth: true,
        inputProps: { autoComplete: 'new-password' }
    }

    return (
        <>
            <Modal
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <Box sx={box_style}>
                    <Grid container minWidth={300} spacing={1.5}>
                        <Grid item xs={12} mb={2} textAlign='center'>
                            <Typography sx={{ color: 'var(--brand)', fontSize: 20 }} variant='h5'>Season expired, please login again.</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='reauth_warning'>
                                {
                                    (error?.email || error?.password || error?.textField) && <AlertBox message={error?.email || error?.password || error?.textField} />
                                }
                            </div>
                        </Grid>

                        <Grid item xs={12} mb={2}>
                            <TextField
                                inputRef={email}
                                error={(error?.textField || error?.email) !== undefined}
                                label='Email'
                                // type='email'
                                {...textFieldProps}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={password}
                                error={(error?.textField || error?.password) !== undefined}
                                label='Password'
                                type='password'
                                {...textFieldProps}
                            />
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='space-between' alignItems='center'>
                            <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>
                                <Checkbox size='small' sx={{
                                    paddingLeft: 0,
                                    '&.Mui-checked': {
                                        color: 'var(--brand)',
                                    },
                                    transform: 'translateY(-1px)'
                                }} />
                                Remember me</Typography>
                            <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>Forgot password ?</Typography>
                        </Grid>
                        <Grid item xs={12} mt={2}>
                            <LoadingButton loading={loading} onClick={() => handleReAuthentication()} sx={{ background: 'var(--brandGradient)', borderRadius: '50px', fontSize: '12px' }} fullWidth>Log in</LoadingButton>
                        </Grid>
                    </Grid>
                </Box>
            </Modal
            >
        </>
    )
}

export default ReAuthenticate
