import { ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useUserData from '../../../Hooks/useUserData'
import moment from 'moment'
import { useState } from 'react'
import Avatar from '../../Avatar/Avatar'

function Person({ user, ...rest }) {
    const { currentUser } = useUserData()
    const setRerenderer = useState(0)[1]

    useEffect(() => {
        let interval
        if (user && !user.active) {
            setRerenderer(pre => pre + 1)
            interval = setInterval(() => {
                setRerenderer(pre => pre + 1)
            }, 60000)
        }
        return () => clearInterval(interval)
    }, [user])

    return (
        <>
            {currentUser.data?.id !== user.user_id &&
                <ListItem {...rest}>
                    <ListItemAvatar>
                        <Avatar displayName={user?.username} profilePicture={user.photo} />
                    </ListItemAvatar>
                    <ListItemText sx={{ textTransform: 'capitalize' }}>{user?.username}</ListItemText>
                    <ListItemText>
                        {
                            user?.active ?
                                'Online' :
                                moment(user?.lastActive).fromNow()
                        }
                    </ListItemText>
                </ListItem>
            }
        </>
    )
}

export default Person