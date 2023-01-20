import styled from '@emotion/styled';
import { Avatar, Badge, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import useUserData from '../../../Hooks/useUserData';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import { useOnlineUsers } from '../../../Hooks/useMessenger';
import { useState } from 'react';

export default function SellerProfile({ seller }) {
    const navigate = useNavigate()
    const [online, setOnline] = useState(false)
    const { data: online_users } = useOnlineUsers()

    useEffect(() => {
        if (!online_users) return
        online_users.forEach(user => {
            user?.user_id === seller?.id ?
                setOnline(true) :
                setOnline(false)
        })
    }, [online_users, seller])


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: online ? '#44b700' : 'grey',
            color: online ? '#44b700' : 'grey',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            scale: '1.7'
        }
    }));

    const handleAvatar = () => {
        if (seller?.photo)
            return { src: seller?.photo }
        return { children: seller?.displayName?.split(' ').map(o => o[0]).join('') }
    }

    return (
        <div style={{ display: 'grid', gap: 20, marginTop: 20 }}>
            <div className='seller_profile'>
                <div style={{ gridRow: 'span 2' }}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar {...handleAvatar()} sx={{ width: 56, height: 56 }} className='customer-profile--picture' alt="Remy Sharp" />
                    </StyledBadge>
                </div>
                <div>
                    <Typography fontWeight={600} fontSize={20}>{seller?.displayName}</Typography>
                    <Typography variant='caption' fontSize={12} color='GrayText'>Online | 97.5% Positive Feedback</Typography>
                </div>
                <span></span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Button onClick={() => navigate(`/store/${seller?.id}`)} sx={{ borderRadius: '10px' }} startIcon={<StorefrontIcon />} variant='outlined'>Visit Store</Button>
                <Button sx={{ borderRadius: '10px' }} startIcon={<ChatIcon />} variant='outlined'>Chat</Button>
            </div>
        </div>
    )
}
