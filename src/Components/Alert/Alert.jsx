import { Alert, Button, Slide } from '@mui/material'
import React, { useEffect } from 'react'

function AlertMessage({ dialog, setDialog }) {
    const style = {
        fontWeight: 600
    }

    const handleActions = () => {
        if (dialog.type !== 'confirmation') return
        dialog.onConfirmation()
        setDialog(pre => {
            return {
                ...pre,
                isConfirmed: true,
                type: 'success'
            }
        })
    }

    useEffect(() => {
        if (!dialog) return
        if (dialog.isConfirmed || dialog.type === 'success')
            var timer = setTimeout (() => {
                setDialog(pre => { return { ...pre, open: false } })
            }, 2000)
        return (() => clearTimeout(timer))
    }, [dialog && dialog.isConfirmed])

    if (!dialog) return ''
    return (
        <Slide in={dialog.open}>
            {
                dialog.type !== 'success' ?
                    <Alert
                        severity="warning"
                        action={
                            <>
                                <Button sx={style} onClick={handleActions} color='inherit'>CONFIRM</Button>
                                <Button sx={style} onClick={() => setDialog(pre => { return { ...pre, open: false } })} color='inherit'>CANCEL</Button>
                            </>
                        }
                        sx={{
                            position: 'fixed',
                            left: '10rem',
                            right: '0',
                            top: '0',
                            margin: 'auto',
                            width: 550,
                            height: '80px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 100
                        }}
                    >
                        {dialog && dialog.confirmationMessage}
                    </Alert >
                    :
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
                        {dialog && dialog.successMessage}
                    </Alert>
            }
        </Slide >
    )
}
export default AlertMessage
