import React, { useState, useEffect, useRef } from 'react'
import Avatar from '../Avatar/Avatar';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import ChangePassword from '../ChangePassword/ChangePassword';
import { IKUpload } from 'imagekitio-react'
import './styles.css'

import { Grid, Divider, TextField, Button } from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import { useAuth } from '../../Hooks/useAuth';
import { useStore } from '../../Context/Store';
import CircularProgress from '@mui/material/CircularProgress';
import CButton from '../MUIComponents/Button'
import ProfileCredentialForm from './ProfileCredentialForm';
import { handleExceptions } from '../../Hooks/useExceptionHandler';

function ProfileDetails() {
    const { updateProfilePicture, verifyEmail, loading } = useAuth()
    const user = useStore(state => state.auth?.user)
    const displayName = useStore(state => state.auth?.user?.displayName)

    const handleInput = () => {
        document.getElementById('IKUploader').click()
    }

    const style = {
        title: { fontSize: 14, fontWeight: 600, color: 'primary' },
        summery: { variant: 'subtitle2', lineHeight: '30px', color: '#111' }
    }

    const handleEmailVerification = () => {
        verifyEmail()
            .catch(error => {
                handleExceptions(error)
            })
    }

    return (
        <>
            <Grid item xs={6} gap={2} mb={1.8} display='flex' alignItems='center' p={'20px 32px'}>
                <ChangePassword />
                <div id='avatar'>
                    <Avatar sx={{ width: 80, height: 80 }} displayName={displayName} profilePicture={user?.photoURL} />
                    <button className='imageUpdateBtn' onClick={() => handleInput()}>
                        <CameraAltRoundedIcon fontSize='30px' color='secondary' />
                        <IKUpload
                            id='IKUploader'
                            folder={"/products-images"}
                            onError={(err) => console.log(err)}
                            onSuccess={(res) => {
                                updateProfilePicture(res.thumbnailUrl)
                            }}
                            hidden
                        />
                    </button>
                </div>
                <div>
                    <Typography whiteSpace='nowrap' variant='h5' fontSize={26} fontWeight={700} mb={0.5}>{displayName}</Typography>
                    <Typography variant='body2' color='var(--brand)'>
                        {
                            user?.emailVerified ?
                                'Varified'
                                :
                                'Account is not varified'
                        }
                    </Typography>
                </div>
            </Grid>
            <Divider sx={{ width: '100%' }} />
            <Grid container columnSpacing={8} rowSpacing={4} p={2}>
                <ProfileCredentialForm />
                {
                    !user?.emailVerified &&
                    <>
                        <Grid item xs={12}>
                            <Divider sx={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='space-between'>
                            <div>
                                <Typography {...style.title}>Verify Account</Typography>
                                <Typography {...style.summery}>We use this to let you sign in and populate your profile information.</Typography>
                            </div>
                            <CButton loading={loading} variant='text' onClick={handleEmailVerification}>Verify Now</CButton>
                        </Grid>
                    </>
                }
                <Grid item xs={12} display='flex' justifyContent='space-between'>
                    <div>
                        <Typography {...style.title}>Delete Account</Typography>
                        <Typography {...style.summery}>By deleting account, you will lose all your data.</Typography>
                    </div>
                    <CButton variant='text'>Delete account</CButton>
                </Grid>
            </Grid>
        </>
    )
}

export default ProfileDetails