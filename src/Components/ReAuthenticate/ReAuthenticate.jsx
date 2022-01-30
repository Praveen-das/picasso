import {
    Box, Grid, Typography, TextField, Button, Modal
    , Checkbox
} from '@mui/material'
import React, { useState } from 'react'
import InputField from '../TextField/InputField'
// import { useFirebase } from '../../Context/FirebaseContext'
// import './login.css'

function ReAuthenticate({ reAuthenticateUser }) {
    const [loginCredential, setLoginCredential] = useState()
    // const { userSignIn } = useFirebase()
    // const [model, setModel] = useState(true)

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

    const handleReAuthentication = (e) => {
        e.preventDefault()
        reAuthenticateUser(loginCredential)
    }

    return (
        <>
            <Modal
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <Box sx={box_style}>
                    <form action="submit" onSubmit={(e) => handleReAuthentication(e)}>
                        <Grid container minWidth={300} spacing={1.5}>
                            <Grid item xs={12} mb={2} textAlign='center'>
                                <Typography sx={{ color: 'var(--brand)', fontSize: 20 }} variant='h5'>Season expired, please login again.</Typography>
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
                            <Grid item xs={12} mt={2}>
                                <Button type='submit' size='large' sx={{ background: 'var(--brandGradient)', borderRadius: '50px', fontSize: '12px' }} variant='contained' fullWidth>Log in</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal
            >
        </>
    )
}

export default ReAuthenticate
