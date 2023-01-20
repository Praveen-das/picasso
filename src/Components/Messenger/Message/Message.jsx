import { Typography } from '@mui/material'
import moment from 'moment'
import React, { forwardRef, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import './message.css'

const Message = ({ message, read, time, self, inView, ...props }) => {
    const dummy = useRef()
    const { ref, inView: isInview, entry } = useInView()

    useEffect(() => {
        inView(isInview)
    }, [isInview])

    useEffect(() => {
        dummy.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, [message])

    return (
        <div ref={ref} style={{ display: 'grid', alignSelf: self ? 'end' : 'start' }}>
            <div ref={read || self ? dummy : null} id='message' className={self ? 'send' : 'receive'} {...props} >
                <Typography
                    fontWeight={500}
                    mt='auto'
                >{message}</Typography>
            </div>
            <Typography px='15px' sx={{ justifySelf: self ? 'end' : 'start' }} variant='caption' lineHeight={2.5}>{moment(time).format('LT')}</Typography>
        </div>
    )
}

export default Message
