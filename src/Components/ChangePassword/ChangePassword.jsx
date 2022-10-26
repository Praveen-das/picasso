import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import react, { useState } from 'react'
import { useStore } from '../../Context/Store';
import { useAuth } from '../../Hooks/useAuth';

function ChangePassword() {
    const [password, setPassword] = useState('')
    const { updateUserPassword } = useAuth()
    const toggled = useStore(state => state.model.toggle)

    const box_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 5,
        p: '5rem 2rem',
        zIndex: 100
    };

    const handlePasswordUpdation = () => {
        if (password.newPassword !== password.confirmPassword) return
        return updateUserPassword(password.newPassword)
    }

    return (
        <>
            <Modal
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={toggled}
                onClose={() => useStore.setState(state => state.model.toggle = false)}
            >
                <Box sx={box_style}>
                    <Grid container rowSpacing={5}>
                        <Grid item xs={12} >
                            <Typography variant='h5'>Change Password</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={(e) =>
                                setPassword(pre => {
                                    return {
                                        ...pre, newPassword: e.target.value
                                    }
                                })
                            } variant='standard' label='New Password' fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={(e) =>
                                setPassword(pre => {
                                    return {
                                        ...pre, confirmPassword: e.target.value
                                    }
                                })
                            } variant='standard' label='Confirm Password' fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={() => handlePasswordUpdation()} variant='contained' fullWidth>Confirm</Button>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
        </>
    )
}

export default ChangePassword
