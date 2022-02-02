import React, { useEffect, useRef } from 'react';
import './status.css'

function Status({ status }) {
    const statusRef = useRef()

    useEffect(() => {
        switch (status) {
            case 'processing':
                statusRef.current.style.background = 'var(--brand)'
                break;
            case 'Delivering':
                statusRef.current.style.background = '#ff9800'
                break;
            case 'Delivered':
                statusRef.current.style.background = '#4caf50'
                break;
            case 'Cancelled':
                statusRef.current.style.background = '#ef5350'
                break;
            default:
                break;
        }
    }, [status])
    return <>
        <span id='status' ref={statusRef}>{status}</span>
    </>;
}

export default Status;
