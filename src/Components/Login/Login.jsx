import {
    Box, Grid, Typography, TextField, Button, Modal
    , Checkbox
} from '@mui/material'
import React, { useState } from 'react'
import InputField from '../TextField/InputField'
import { useFirebase } from '../../Context/FirebaseContext'
import './login.css'

function Login({ model, setModel }) {
    const [loginCredential, setLoginCredential] = useState()
    const { userSignIn } = useFirebase()

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

    const handleLogin = async (e) => {
        e.preventDefault()
        await userSignIn(loginCredential)
        setModel({ login: false, signup: false })
    }

    return (
        <>
            <Modal
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={model.login}
                onClose={() => setModel({ login: false, signup: false })}
            >
                <Box sx={box_style}>
                    <form action='submit' onSubmit={(e) => handleLogin(e)}>
                        <Grid container minWidth={300} spacing={1.5}>
                            <Grid item xs={12} mb={2} textAlign='center'>
                                <Typography sx={{ color: 'var(--brand)' }} variant='h5'>Log in</Typography>
                            </Grid>
                            {/* <Grid item xs={12} display='flex' justifyContent='space-evenly'>
                                    <IconButton aria-label="delete">
                                        <Google sx={{ fontSize: 30, color: '#DB4437' }} />
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                        <Facebook sx={{ fontSize: 30, color: '#4267B2' }} />
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                        <Twitter sx={{ fontSize: 30, color: '#1DA1F2' }} />
                                    </IconButton>
                                </Grid> */}
                            {/* <Grid item xs={12} m='1rem 0'>
                                    <Divider sx={{fontSize:'16px',color:'hsl(0, 0%, 46%)'}}>or</Divider>
                                </Grid> */}
                            <InputField type='email' size='large' xs={12} md={12} label='Email' onChange={(e) => setLoginCredential(pre => { return { ...pre, email: e.target.value } })} />
                            <Grid item xs={12}>
                                <TextField hidden size='large' variant='standard' inputProps={{ autoComplete: 'new-password' }} label='Password' type='password' fullWidth onChange={(e) => setLoginCredential(pre => { return { ...pre, password: e.target.value } })} />
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
                            <Grid item xs={12} >
                                <Button type='submit' size='large' sx={{ background: 'var(--brandGradient)', borderRadius: '50px', fontSize: '12px' }} variant='contained' fullWidth>Log in</Button>
                            </Grid>
                            <Grid item xs={12} mt={1} textAlign="center">
                                <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>Not registered yet ?
                                    <button
                                        onClick={() => setModel({
                                            login: false,
                                            signup: true
                                        })}
                                        className='create-account' htmlFor="">Create an account</button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal
            >
        </>
    )
}

export default Login
