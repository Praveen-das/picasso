import { Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import './message.css'
import DoneAllIcon from '@mui/icons-material/DoneAll';

const Message = ({ message, active, time, self, inView, unread, ...props }) => {
    const dummy = useRef()
    const { ref, inView: isInView } = useInView()

    useEffect(() => {
        isInView && inView(isInView)
    }, [isInView])

    useEffect(() => {
        active && dummy.current?.scrollIntoView({ block: 'nearest' })
    }, [message, active])

    return (
        <div ref={ref} style={{ display: 'grid', alignSelf: self ? 'end' : 'start' }}>
            <div id='message' className={self ? 'send' : 'receive'} {...props} >
                <Typography
                    fontWeight={500}
                    mt='auto'
                >{message}</Typography>
            </div>
            <div style={{ display: 'grid' }} ref={dummy}>
                <Typography px='15px' sx={{ justifySelf: self ? 'end' : 'start' }} variant='caption' lineHeight={2.5}>
                    {!self && <DoneAllIcon sx={{ fontSize: 18, translate: '-10px 3px', color: 'var(--brand)' }} />}
                    {moment(time).format('LT')}
                    {self && <DoneAllIcon sx={{ fontSize: 18, translate: '10px 3px', color: 'var(--brand)' }} />}
                </Typography>
            </div>
        </div>
    )
}

export default Message
