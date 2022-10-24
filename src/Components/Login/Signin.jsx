import { Grid, Typography, TextField, Button, Checkbox } from '@mui/material'
import React, { useState } from 'react'
import InputField from '../TextField/InputField'
import './login.css'
import { useAuth } from '../../Hooks/useAuth'

function Signin({ setModel }) {
    const [loginCredential, setLoginCredential] = useState()
    const { signin } = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        await signin(loginCredential)
        await setModel(false)
    }

    return (
        <>
            <form action='submit' onSubmit={(e) => handleLogin(e)}>
                <Grid container width={{ xs: '300px', md: '500px' }} spacing={3} padding='0 4em'>
                    <Grid item xs={12} mb={2} textAlign='center'>
                        <Typography sx={{ color: 'var(--brand)' }} variant='h5' fontSize='2rem'>Log in</Typography>
                    </Grid>
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
                    <Grid item xs={12} textAlign='center'>
                        <Button type='submit' size='large' sx={{ background: 'var(--brandGradient)', borderRadius: '50px', fontSize: '12px', width: '200px' }} variant='contained'>Log in</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default Signin