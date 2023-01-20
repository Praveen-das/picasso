import { Grid, IconButton, List, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../../Context/Store';
import socket from '../../lib/ws'
import Person from './Person/Person';
import SendIcon from '@mui/icons-material/Send';
import useUserData from '../../Hooks/useUserData';
import Message from './Message/Message';
import { useInView } from 'react-intersection-observer'

export function Messenger() {
    const { currentUser } = useUserData()
    const online_users = useStore(s => s.onlineUsers)
    const [message, setMesage] = useState()
    const [receiver, setReceiver] = useState('')
    const [selectedUser, setSelectedUser] = useState()
    const [room, setRoom] = useState('')
    const messages = useStore(s => s.messages)

    useEffect(() => setSelectedUser(online_users[0]?.user_id), [online_users])

    const sendMessage = () => {
        socket.emit(
            'user_chat',
            {
                message,
                to: receiver,
            }
        )
        // setMesage('')
    }

    useEffect(() => {
        if (currentUser.isLoading) return
        if (currentUser.isFetching) return
        const room = [selectedUser, currentUser.data?.id].sort().join('|')
        setRoom(room)
    }, [selectedUser, currentUser])

    useEffect(() => {
        console.log(messages);
    }, [messages])

    return (
        <Grid container spacing={2} p={2} height='calc(100vh - 70px - 4em)'>
            <Grid item xs={6}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {
                        !!online_users?.length &&
                        online_users.map(user => (
                            <Person
                                sx={{ bgcolor: selectedUser === user.user_id ? '#e9e9e9' : 'none' }}
                                onClick={() => {
                                    setSelectedUser(user.user_id)
                                    setReceiver(user.user_id)
                                }}
                                key={user.user_id}
                                user={user} />
                        ))
                    }
                </List>
            </Grid>
            <Grid item xs={6} height='100%' >
                <Box sx={{ height: '100%', display: 'grid', alignItems: 'flex-end', p: 2, overflow: 'scroll', boxSizing: 'border-box' }} >
                    <Stack
                        direction="column"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        gap={2}
                    >
                        {
                            messages[room]?.map(chat => (
                                <Message
                                    inView={(isInView) => { if (isInView) chat.read = true }}
                                    read={chat.read}
                                    message={chat.message}
                                    time={chat.receivedOn}
                                    self={chat.user_id === currentUser.data?.id}
                                    key={chat.receivedOn}
                                />
                            ))
                        }
                    </Stack>
                    {/* <div ref={dummy}></div> */}
                </Box>
                <Box display={'flex'} gap={4}>
                    <TextField value={message} onChange={(e) => setMesage(e.target.value)} variant='filled' size='small' fullWidth />
                    <IconButton onClick={sendMessage}><SendIcon color='primary' /></IconButton>
                </Box>
            </Grid>
        </Grid>
    );
}
