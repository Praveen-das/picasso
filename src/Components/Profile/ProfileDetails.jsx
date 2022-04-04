import React, { useState, useEffect } from 'react'
import { Grid, Typography, Button, Divider } from '@mui/material'
import TextField from '@mui/material/TextField';
import Avatar from '../Avatar/Avatar';
import { useFirebase } from '../../Context/FirebaseContext'
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import ChangePassword from '../ChangePassword/ChangePassword';
import { IKUpload } from 'imagekitio-react'
import './styles.css'

function ProfileDetails() {
    const { currentUser, updateUserCredentials, updateProfilePicture, verifyEmail } = useFirebase()
    const [userCredentials, setUserCredentials] = useState({
        displayName: currentUser.displayName ? currentUser.displayName : '',
        email: currentUser.email ? currentUser.email : '',
    })
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [model, setModel] = useState(false)

    useEffect(() => {
        const fullName = currentUser.displayName.split(' ')
        if (fullName.length > 2) {
            if (fullName[2].length <= 2) {
                setFirstName(fullName[0]);
                setLastName(fullName.slice(1).join(' '));
                return
            }
            setFirstName(fullName.slice(0, -1).join(' '))
            setLastName(fullName.slice(-1).join(' '))
            return
        }
        if (fullName.length === 2) {
            setFirstName(fullName[0])
            setLastName(fullName[1])
            return
        }
        setFirstName(...fullName)
    }, [currentUser])

    const handleProfileUpdation = () => {
        const fullName = firstName + ' ' + lastName
        updateUserCredentials({ ...userCredentials, displayName: fullName })
    }

    const handleInput = () => {
        document.getElementById('IKUploader').click()
    }

    return (
        <>
            <Grid item xs={6} gap={2} mb={1.8} display='flex' alignItems='center' p={3}>
                <ChangePassword openModel={model} closeModel={setModel} />
                <div id='avatar'>
                    <Avatar sx={{ width: 80, height: 80 }} displayName={currentUser.displayName} profilePicture={currentUser.photoURL} />
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
                    <Typography variant='h5'>{currentUser.displayName}</Typography>
                    <Typography variant='body2' color='var(--brand)'>
                        {
                            currentUser.emailVerified ?
                                'Varified'
                                :
                                'Account is not varified'
                        }
                    </Typography>
                </div>
            </Grid>
            <Divider sx={{ width: '100%' }} />
            <Grid container columnSpacing={8} rowSpacing={4} p={2}>
                <Grid item xs={6}>
                    <Typography variant='h6' color='primary'>First Name</Typography>
                    <TextField value={firstName} variant='standard' fullWidth onChange={(e) => setFirstName(e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h6' color='primary'>Last Name</Typography>
                    <TextField value={lastName} variant='standard' fullWidth onChange={(e) => setLastName(e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h6' color='primary'>Email Address</Typography>
                    <TextField value={userCredentials.email} variant='standard' fullWidth onChange={(e) => setUserCredentials(pre => { return { ...pre, email: e.target.value } })}></TextField>
                </Grid>
                <Grid item xs={6} display='flex' justifyContent='right' alignItems='flex-end'>
                    <Button sx={{ height: 40 }} size='large' onClick={() => handleProfileUpdation()} variant='contained'>Save changes</Button>
                </Grid>
                {
                    !currentUser.emailVerified &&
                    <>
                        <Grid item xs={12}>
                            <Divider sx={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='space-between'>
                            <div>
                                <Typography variant='h6' color='primary'>Verify Account</Typography>
                                <Typography variant='subtitle2'>We use this to let you sign in and populate your profile information</Typography>
                            </div>
                            <Button onClick={() => verifyEmail()} variant='text' >Verify Now</Button>
                        </Grid>
                    </>
                }
                <Grid item xs={12}>
                    <Divider sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='space-between'>
                    <Typography variant='h6' color='primary'>Change password</Typography>
                    <Button onClick={() => setModel(!model)} variant='text' >Change now</Button>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='space-between'>
                    <div>
                        <Typography variant='h6' color='primary'>Delete Account</Typography>
                        <Typography variant='subtitle2'>By deleting account, you will lose all your data</Typography>
                    </div>
                    <Button variant='text' >Delete account</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default ProfileDetails
