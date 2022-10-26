import { Typography } from '@mui/material'
import react, { useEffect } from 'react'
import './style.css'

function AlertBox({ message, type }) {
    useEffect(() => {
        let elms = document.getElementsByName('accordion_warning')
        elms.forEach(elm => {
            elm?.classList.add('animate')
            const timer = setTimeout(() => elm?.classList.remove('animate'), 200)
            return () => clearTimeout(timer)
        })
    })

    return (
        <div name='accordion_warning' className={`accordion_warning ${type || 'warning'}`}>
            <Typography variant='h6' color='#a31616' fontSize={14}>{message}</Typography>
        </div >
    )
}

export default AlertBox