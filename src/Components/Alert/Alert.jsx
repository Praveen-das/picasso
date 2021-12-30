import { Alert, Button, Slide } from '@mui/material'
import React, { useEffect } from 'react'

function AlertMessage({ confirmationDialog, setConfirmationDialog, confirmationMessage, successMessage }) {

    const style = {
        fontWeight: 600
    }

    const handleActions = () => {
        // confirmationDialog.isConfirmed()
        setConfirmationDialog(
            {
                isSuccess: true,
                open: true
            })
    }

    useEffect(() => {
        if (confirmationDialog.isSuccess)
            setTimeout(() => setConfirmationDialog(
                {
                    isSuccess: true,
                    open: false
                }), 2000)
    },[confirmationDialog.isSuccess])

    return (
        <Slide in={confirmationDialog.open}>
            {
                confirmationDialog.isSuccess ?
                    <Alert
                        sx={{
                            position: 'fixed',
                            left: '10rem',
                            right: '0',
                            top: '0',
                            margin: 'auto',
                            width: 300,
                            height: '80px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 100
                        }}
                        severity="success">
                        {successMessage}
                    </Alert>
                    :
                    <Alert
                        severity="warning"
                        action={
                            <>
                                <Button sx={style} onClick={handleActions} color='inherit'>CONFIRM</Button>
                                <Button sx={style} onClick={() => setConfirmationDialog({ open: false })} color='inherit'>CANCEL</Button>
                            </>
                        }
                        sx={{
                            position: 'fixed',
                            left: '10rem',
                            right: '0',
                            top: '0',
                            margin: 'auto',
                            width: 500,
                            height: '80px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 100
                        }}
                    >
                        {confirmationMessage}
                    </Alert>
            }
        </Slide>
    )
}
export default AlertMessage
