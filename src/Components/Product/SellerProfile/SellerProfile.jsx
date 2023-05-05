import { Button, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import useCurrentUser from '../../../Hooks/useCurrentUser';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { OnlineBadge } from '../../MUIComponents/OnlineBadge';
import { useStore } from '../../../Context/Store';
import moment from 'moment'
import Avatar from '../../Avatar/Avatar';

function SellerProfile({ product_id, sellerId }) {
    const navigate = useNavigate()
    const [seller, setSeller] = useState(null)
    const connectedUsers = useStore(s => s.connectedUsers)
    const setChatWidget = useStore(s => s.setChatWidget); 
    const { open } = useStore(s => s.chatWidget);
    const { currentUser } = useCurrentUser();

    useEffect(() => {
        const user = connectedUsers.find(user => user?.user_id === sellerId)
        setSeller(user)
    }, [connectedUsers, sellerId])

    return (
        <div style={{ display: 'grid', gap: 20, marginTop: 10,}}>
            <div className='seller_profile'>
                <div style={{ gridRow: 'span 2' }}>
                    <OnlineBadge online={seller?.active} scale={1.7} >
                        <Avatar displayName={seller?.username || ''} profilePicture={seller?.photo} sx={{ width: 56, height: 56 }} />
                    </OnlineBadge>
                </div>
                <div>
                    <Typography fontWeight={600} fontSize={20}>{seller?.username}</Typography>
                    <Typography variant='caption' fontSize={12} color='GrayText'>{seller?.active ? 'Online' : moment(seller?.lastActive).fromNow()}</Typography>
                </div>
                <span></span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,maxWidth:400 }}>
                <Button onClick={() => navigate(`/store/${sellerId}`)} sx={{ borderRadius: '10px' }} startIcon={<StorefrontIcon />} variant='outlined'>Visit Store</Button>
                {
                    sellerId !== currentUser.data?.id &&
                    <Button onClick={() => {
                        if(!currentUser.data) return navigate('/login')
                        setChatWidget(!open, true, { ...seller, product_id })
                    }} sx={{ borderRadius: '10px' }} startIcon={<ChatIcon />} variant='outlined'>Chat</Button>
                }
            </div>
        </div>
    )
}
export default SellerProfile
