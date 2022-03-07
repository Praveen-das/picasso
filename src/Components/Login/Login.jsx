import {
    Box, Grid, Typography, TextField, Button, Modal
    , Checkbox
} from '@mui/material'
import React, { useState } from 'react'
import InputField from '../TextField/InputField'
import { useFirebase } from '../../Context/FirebaseContext'
import RightIcon from '@mui/icons-material/ChevronRight';
import LeftIcon from '@mui/icons-material/ChevronLeft';
import Signin from './Signin'
import './login.css'
import Signup from './Signup';

function Login({ model, setModel }) {
    const [loginCredential, setLoginCredential] = useState()
    const { userSignIn } = useFirebase()
    const [isToggled, setIsToggled] = useState(false)

    const box_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 5,
        zIndex: 100,
        height: 600,
        display: 'grid',
        placeItems: 'center',
        gridTemplateColumns: '1fr 1fr',
        overflow: 'hidden'
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        await userSignIn(loginCredential)
        setModel({ login: false, signup: false })
    }

    const leftBoxStyle = {
        transform: `translateX(${isToggled ? '100%' : 0})`,
        boxShadow: `${isToggled ? 'none' : '5px 0 20px var(--shadow)'}`,
        zIndex: isToggled ? 'unset' : 2
    }
    const rightBoxStyle = {
        transform: `translateX(${isToggled ? '-100%' : 0})`,
        boxShadow: isToggled ? '5px 0 20px var(--shadow)' : 'none',
    }
    const signinStyle = {
        pointerEvents: `${isToggled ? 'none' : 'all'}`,
        opacity: `${isToggled ? 0 : 1}`
    }
    const signupStyle = {
        pointerEvents: `${isToggled ? 'all' : 'none'}`,
        opacity: `${isToggled ? 1 : 0}`,
    }

    return (
        <>
            <Modal
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={model.login}
                onClose={() => setModel({ login: false, signup: false })}
            >
                <Box sx={box_style}>
                    <Grid style={leftBoxStyle} className='login_left' item width={{ xs: '300px', md: '500px' }} spacing={4}>
                        <div style={{ opacity: isToggled ? 0 : 1 }} className='signup_hero'>
                            <Grid item xs={12}>
                                <Typography variant='h5' fontSize='2rem'>Hello Friend !</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography lineHeight={1.4} variant='h2' fontSize={18}>Signup now and start your journey with us</Typography>
                            </Grid>
                            <button onClick={() => setIsToggled(!isToggled)} className='signup_btn' sx={{ background: 'white' }} type='submit' variant='contained'><RightIcon sx={{ width: '1.3em', height: '1.3em' }} /></button>
                        </div>
                        <div style={{ opacity: isToggled ? 1 : 0 }} className='signin_hero'>
                            <Grid item xs={12}>
                                <Typography variant='h5' fontSize='2rem'>Welcome Back !</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography lineHeight={1.4} variant='h2' fontSize={18} >To keep connected with us, please login with your personal details</Typography>
                            </Grid>
                            <button onClick={() => setIsToggled(!isToggled)} className='signup_btn' sx={{ background: 'white' }} type='submit' variant='contained'><LeftIcon sx={{ width: '1.3em', height: '1.3em' }} /></button>
                        </div>
                    </Grid>
                    <Grid style={rightBoxStyle} className='login_right' item width={{ xs: '300px', md: '500px' }} spacing={4}>
                        <div className='signinStyle' style={signinStyle}>
                            <Signin />
                        </div>
                        <div className='signupStyle' style={signupStyle}>
                            <Signup />
                        </div>
                    </Grid>
                </Box>
            </Modal>
        </>
    )
}

export default Login
