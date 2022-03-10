import {
    Box, Grid, Typography, TextField, Button, Modal
    , Checkbox, Divider
} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Google from '@mui/icons-material/Google';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import React, { useState } from 'react'
import InputField from '../TextField/InputField'
import { useFirebase } from '../../Context/FirebaseContext';

function Signup({ setModel }) {
    const [signupCredential, setSignupCredential] = useState()
    const [error, setError] = useState()

    const { signupUsingEmailPassword } = useFirebase()

    const handleSignup = async (e) => {
        e.preventDefault()
        await signupUsingEmailPassword(signupCredential)
            .then(() => setModel(false))
            .catch((error) => {
                console.log(error);
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setError({ email: true, message: 'Email already in use' })
                        break;
                    case 'auth/invalid-email':
                        setError({ email: true, message: 'Invalid email' })
                        break;
                    case 'auth/weak-password':
                        setError({ password: true, message: 'Minimum 6 characters required' })
                        break;
                    default:
                        break;
                }
            })
    }

    return (
        <>
            <form action='submit' onSubmit={(e) => handleSignup(e)} >
                <Grid container width={{ xs: '300px', md: '500px' }} spacing={2} padding='0 4em'>
                    <Grid item xs={12} mb={2} textAlign='center'>
                        <Typography sx={{ color: 'var(--brand)' }} variant='h5' fontSize='2rem'>Sign up</Typography>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='space-evenly'>
                        <IconButton aria-label="delete">
                            <Google sx={{ fontSize: 30, color: '#DB4437' }} />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <Facebook sx={{ fontSize: 30, color: '#4267B2' }} />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <Twitter sx={{ fontSize: 30, color: '#1DA1F2' }} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} m='1rem 0'>
                        <Divider sx={{ fontSize: '16px', color: 'hsl(0, 0%, 46%)' }}>or</Divider>
                    </Grid>
                    <InputField required size='small' xs={12} md={12} label='Username'
                        onChange={(e) => {
                            setSignupCredential(pre => {
                                return { ...pre, username: e.target.value }
                            })
                        }} />
                    <InputField sx={{ marginBlock: '1rem' }} error={error && error.email} helperText={error && error.email && error.message} required size='small' type='email' xs={12} md={12} label='Email'
                        onChange={(e) => {
                            setError()
                            setSignupCredential(pre => { return { ...pre, email: e.target.value } })
                        }} />
                    <Grid item xs={12}>
                        <TextField error={error && error.password} helperText={error && error.password && error.message} required size='small' variant='standard' inputProps={{ autoComplete: 'new-password' }} label='Password' type='password' fullWidth
                            onChange={(e) => {
                                setError()
                                setSignupCredential(pre => { return { ...pre, password: e.target.value } })
                            }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>
                            <Checkbox size='small' sx={{
                                transform: 'translateY(-1px)',
                                paddingLeft: 0, '&.Mui-checked': {
                                    color: 'var(--brand)',
                                }
                            }} />
                            I Agree to the Terms & Conditions</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Button type='submit' size='large' sx={{ background: 'var(--brandGradient)', borderRadius: '50px', fontSize: '12px' }} variant='contained' fullWidth>Sign up</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default Signup
