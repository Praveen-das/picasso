import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useUserData from '../../Hooks/useUserData'
import socket from '../../lib/ws'

export default function Store() {
    const [sendMessage, setSendMessage] = useState('')
    const [receivedMessage, setReceivedMessage] = useState([])
    const { id: sid } = useParams()
    const user_id = useUserData()?.currentUser.data?.id || 'praveen'
    const room = useRef(`${sid}|${user_id || 'praveen'}`)

    return (
        <div style={{ display: 'grid', justifyContent: 'center', gap: 20 }}>
            <input onChange={(e) => setSendMessage(e.target.value)} type="text" />
            <button onClick={() => socket.emit('chat', { sid, user_id, message: sendMessage }, (val) => {
                console.log(val)
            })}>send</button>
            <button onClick={() => socket.disconnect()}>disconnect</button>
            {
                !!receivedMessage.length &&
                receivedMessage.map(o => <label>{o}</label>)
            }
        </div>
    )
}
