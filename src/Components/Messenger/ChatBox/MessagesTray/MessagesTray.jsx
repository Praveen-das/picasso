import { Badge } from '@mui/material';
import { Box } from '@mui/system';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useStore } from '../../../../Context/Store';
import socket from '../../../../lib/ws';
import Message from '../Message/Message';

function MessagesTray({ roomId, reply, setReply }) {
    const boxRef = useRef();
    const [state, setState] = useState('initial');
    const msgs = useStore(s => s.messages)
    const unread = useStore(s => s.unreadMessages)
    const setMessages = useStore(s => s.setMessages)

    const messages = msgs.get(roomId) || []

    useEffect(() => {
        const um = unread.get(roomId) || []
        if (um) setMessages(roomId, um)
    }, [unread, roomId])

    function onScroll(e) {
        let ch = e.target.clientHeight;
        let sh = e.target.scrollHeight;
        let st = e.target.scrollTop;

        if (ch === sh) return;
        if (ch + st > sh - 50) setState('active');
        else setState('passive')
    }

    useEffect(() => {
        boxRef.current?.addEventListener('scroll', onScroll, false);
        return () => {
            setState('initial')
            boxRef.current?.removeEventListener('scroll', onScroll);
        };
    }, [roomId]);

    return (
        <>
            <Box
                ref={boxRef}
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'scroll',
                    boxSizing: 'border-box',
                    p: '0.2rem',
                    bgcolor: 'var(--shade)',
                    boxShadow: '0 2px 5px #0000002e',
                    "::-webkit-scrollbar": {
                        width: '2px !important'
                    },
                    "::-webkit-scrollbar-thumb": {
                        background: '#dee2e7'
                    }
                }}
            >
                {
                    !!messages?.length &&
                    messages.map((chat, i) => chat && (
                        <Message
                            ref={node => {
                                if (!node || reply) return;
                                const self = socket.user_id === chat.from
                                const parent = node.parentNode
                                const notScrolled = parent.clientHeight >= parent.scrollHeight - 50

                                if ((self && chat.new) || (chat.active && state !== 'passive')) node.scrollIntoView({ block: 'nearest' });
                                if (notScrolled) node.scrollIntoView({ block: 'nearest' });
                                else if (state === 'initial' && !chat.new) node.scrollIntoView({ block: 'nearest' })
                                if ((state !== 'passive' && chat.status === 'seen') || self) {
                                    chat.active = false
                                    chat.new = false
                                }
                                if (messages?.length === i + 1 &&
                                    !self &&
                                    chat.status !== 'seen'
                                ) socket.emit('chatSeen', { user_id: chat?.from, roomId });
                            }
                            }
                            chat={chat}
                            key={chat.receivedOn + i}
                            roomId={roomId}
                            setReply={(reply) => {
                                setState('passive')
                                setReply(reply)
                            }}
                            self={socket.user_id === chat.from}
                            index={i}
                        />
                    ))}
                <div style={{ minHeight: '0.5px', overflowAnchor: 'auto', marginTop: '-0.5px' }}></div>
            </Box>
            <Badge
                sx={{ justifySelf: 'center', translate: '0 -15px' }}
                badgeContent={messages?.some(o => o?.new && !o.self && state === 'passive') ? 'new' : 0}
                color="primary"
            />

        </>
    );
}

export default memo(MessagesTray)
