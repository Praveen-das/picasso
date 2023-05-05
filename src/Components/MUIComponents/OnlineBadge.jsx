import styled from '@emotion/styled';
import { Badge } from '@mui/material';
import React from 'react';

export function OnlineBadge({ children, online, scale = 1 }) {
    const _OnlineBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: online ? '#44b700' : 'grey',
            color: online ? '#44b700' : 'grey',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            scale: `${scale}`
        }
    }));

    return (
        <_OnlineBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
        >
            {children}
        </_OnlineBadge>
    );
}
