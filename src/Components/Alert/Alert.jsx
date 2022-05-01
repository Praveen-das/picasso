import React, { useEffect } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useStore } from '../../Context/Store';
import './style.css'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert sx={{ height: 50, alignItems: 'center' }} variant='filled' ref={ref} {...props} />;
});

function AlertMessage() {

    const {
        toggled,
        message,
        type,
        time
    } = useStore(state => state.alert)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        useStore.setState(pre => ({
            alert: {
                ...pre.alert,
                toggled: false
            }
        }));
    };

    return (
        <Snackbar
            sx={{ transform: 'translateY(1.5rem)' }}
            open={toggled}
            autoHideDuration={time || 3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert severity={type}>{message}</Alert>
        </Snackbar>
    )
}
export default AlertMessage
