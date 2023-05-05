import { IconButton, InputBase, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import socket from '../../../lib/ws';
// import SendIcon from '@mui/icons-material/Send';
import MessagesTray from './MessagesTray/MessagesTray';
import ClearIcon from '@mui/icons-material/Clear';
import { ReactComponent as SendIcon } from '../../../Assets/Icons/sendIcon.svg'
import { useStore } from '../../../Context/Store';
import confirmAction from '../../ConfirmationDialog/ConfirmationDialog';

export function ChatBox({ data }) {
    const [reply, setReply] = useState(null);
    const blockedUsers = useStore(s => s.blockedUsers)
    const blockedUser = blockedUsers.includes(data?.user_id)
    const set = useStore(s => s.set)

    const sendMessage = (message) => {
        if (blockedUser)
            return confirmAction(
                'Blocked user',
                'Unblock user to continue chatting.',
                () => socket.emit('unblock_room', data.user_id),
            )
        const payload = {
            message,
            to: data.user_id,
        }
        if (data?.product_id) {
            Object.assign(payload, { product_id: data.product_id })
            data.product_id = null
            delete data.product_id
        }
        socket.emit('user_chat', payload);
    };

    const sendReply = (message) => {
        if (blockedUser) return
        socket.emit(
            'user_chat',
            {
                ...reply,
                message,
                to: data.user_id,
            }
        );
        setReply(null);
    };

    return (
        <Box
            boxSizing='border-box'
            position='relative'
            height='100%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            overflow='hidden'
        >
            <MessagesTray
                roomId={data?.room.id}
                reply={reply}
                setReply={setReply}
            />
            {reply &&
                <div id='mgs_reply'>
                    <Typography
                        variant='h10'
                        fontWeight={500}
                        noWrap
                    >
                        {reply.mainMessage}
                    </Typography>
                    <IconButton onClick={() => setReply(null)} sx={{ position: 'absolute', right: 0 }}>
                        <ClearIcon />
                    </IconButton>
                </div>}
            <TypeField disabled={Boolean(!data)} onSend={reply ? sendReply : sendMessage} />
        </Box >
    );
}

function TypeField({ disabled, onSend }) {
    const [message, setMessage] = useState('');

    return (
        <Box
            display='flex'
            width='-webkit-fill-available'
            py={1}
        >
            <InputBase
                placeholder='Type a message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                variant='outlined'
                sx={{ ml: 2, fontSize: '15px', fontWeight: 500 }}
                fullWidth
            />
            <IconButton
                disabled={disabled}
                onClick={() => onSend(message)}
                color='primary'
                size='large'
                sx={{
                    mr: 1, bgcolor: 'var(--brand)', ":hover": { bgcolor: 'var(--brand)' },
                    ".MuiTouchRipple-root": { color: 'white' }
                }}
            >
                <SendIcon style={{ fill: !disabled ? 'white' : 'rgb(189 189 189)', width: '16px', translate: '-1px' }} />
            </IconButton>
        </Box >
    )
}