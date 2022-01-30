import React, { useEffect, useRef } from 'react';
import './status.css'

function Status({ status }) {
    const statusRef = useRef()

    useEffect(() => {
        switch (status) {
            case 'processing':
                statusRef.current.style.background = 'var(--brand)'
                break;
            case 'delivering':
                statusRef.current.style.background = '#ff9800'
                break;
            case 'delivered':
                statusRef.current.style.background = '#4caf50'
                break;
            case 'cancelled':
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
