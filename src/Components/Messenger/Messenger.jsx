import { Badge, Grid, IconButton, List, Stack, TextField } from '@mui/material';
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
    const changeActiveStatus = useStore(s => s.changeActiveStatus)
    const setRoom = useStore(s => s.setRoom)
    const room = useStore(s => s.room)
    const [message, setMesage] = useState()
    const [receiver, setReceiver] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)
    const messages = useStore(s => s.messages)

    useEffect(() => setSelectedUser(online_users[0]), [online_users])

    const sendMessage = () => {
        socket.emit(
            'user_chat',
            {
                message,
                to: receiver,
                from: socket.id
            }
        )
    }

    useEffect(() => {
        if (currentUser.isLoading) return
        if (currentUser.isFetching) return
        if (!selectedUser) return
        setRoom(selectedUser.user_id, currentUser.data?.id)
    }, [selectedUser, currentUser])

    return (
        <Grid container spacing={2} p={2} height='calc(100vh - 70px - 4em)'>
            <Grid item xs={6}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {
                        !!online_users?.length &&
                        online_users.map(user => (
                            <Badge badgeContent={messages[room]?.filter(o => o.read && o.room === room).length || 0} color="primary">
                                <Person
                                    sx={{ bgcolor: selectedUser?.user_id === user.user_id ? '#e9e9e9' : 'none' }}
                                    onClick={() => {
                                        setSelectedUser(user)
                                        setReceiver(user.user_id)
                                    }}
                                    key={user.user_id}
                                    user={user} />
                            </Badge>
                        ))
                    }
                </List>
            </Grid>
            <Grid item xs={6} height='100%' >
                <Box
                    sx={{
                        height: '100%',
                        display: 'grid',
                        alignItems: 'flex-end',
                        p: '0 1rem',
                        overflow: 'scroll',
                        boxSizing: 'border-box',
                        "::-webkit-scrollbar": {
                            width: '2px !important'
                        },
                        "::-webkit-scrollbar-thumb": {
                            background: 'rgba(0, 0, 0, 0.100)'
                        }
                    }} >
                    <Stack
                        direction="column"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        gap={2}
                    >
                        {
                            messages[room]?.map(chat => (
                                <Message
                                    inView={(isInView) => { if (isInView) changeActiveStatus(room, chat.receivedOn) }}
                                    message={chat.message}
                                    active={chat.active}
                                    time={chat.receivedOn}
                                    self={chat.self || false}
                                    key={chat.receivedOn}
                                    unread={messages[room]?.findIndex(o => !o.active)}
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
