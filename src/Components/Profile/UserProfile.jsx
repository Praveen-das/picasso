import { Box, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Tab, Tabs, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import ProfileDetails from './Components/ProfileDetails'
import ManageAddress from './ManageAddress'
import MyOrders from './MyOrders'

import { styled } from '@mui/material/styles';
import LocalMallIcon from '@mui/icons-material/LocalMallOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import ChatBubbleIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useStore } from '../../Context/Store'
import Avatar from '../Avatar/Avatar'
import socket from '../../lib/ws'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: { xs: 2, sm: 3 } }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function CTabs({ children, value, onChange }) {
    const sm = useMediaQuery('(min-width:600px)')
    const md = useMediaQuery('(min-width:900px)')

    if (md)
        return (
            <Tabs
                textColor='primary'
                orientation='vertical'
                value={value}
                onChange={onChange}
                aria-label="basic tabs example"
            >{children}</Tabs>
        )
    return (
        <Tabs
            variant="scrollable"
            scrollButtons="auto"
            textColor='primary'
            orientation='horizontal'
            value={value}
            onChange={onChange}
            aria-label="basic tabs example"
        >{children}</Tabs>
    )
}

function UserProfile() {
    const [value, setValue] = useState(3);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        position: 'relative',
        minHeight: 'calc(100vh - 9rem)',
        color: theme.palette.text.primary,
        borderRadius: '10px'
    }));

    const itemStyling = {
        sx: {
            padding: { md: '2rem 3rem' },
            boxShadow: { xs: 'none', md: '-5px 5px 20px 2px var(--shadow)' }

        },
        elevation: 0
    }

    const tabStyling = {
        sx: { minHeight: 50, justifyContent: 'left' }, iconPosition: 'start'
    }

    return (
        <Grid container sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
            <Grid item sx={{ paddingTop: { xs: 0, md: 3 }, paddingLeft: { xs: 0, sm: 1, md: 0 } }} xs={12} md={2} >
                <CTabs value={value} onChange={handleChange}>
                    <Tab {...tabStyling} icon={<PersonIcon fontSize='small' />} label="Personal Details" />
                    <Tab {...tabStyling} icon={<LocalMallIcon fontSize='small' />} label="My Orders" />
                    <Tab {...tabStyling} icon={<HomeIcon fontSize='small' />} label="Manage Address" />
                    <Tab {...tabStyling} icon={<ChatBubbleIcon fontSize='small' />} label="Chat Settings" />
                </CTabs>
            </Grid>
            <Grid item xs={12} md>
                <TabPanel value={value} index={0}>
                    <Item {...itemStyling} >
                        <ProfileDetails />
                    </Item>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Item {...itemStyling}>
                        <MyOrders />
                    </Item>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Item {...itemStyling}>
                        <ManageAddress />
                    </Item>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Item {...itemStyling}>
                        <MessengerSettings />
                    </Item>
                </TabPanel>
            </Grid>
        </Grid>
    )
}

export default UserProfile

function MessengerSettings() {
    const blockedUsers = useStore(s => s.blockedUsers)
    const connectedUsers = useStore(s => s.connectedUsers)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const list = connectedUsers?.filter(o => blockedUsers?.includes(o.user_id))
        setUsers(list)
    }, [connectedUsers, blockedUsers])

    const style = {
        title: { fontSize: 16, fontWeight: 600, color: "primary" },
        summery: { variant: "subtitle2", lineHeight: "30px", color: "#111" },
    };

    return (
        <Grid container>
            <Grid item xs={12} mb={2}>
                <Typography variant="h5" fontWeight={800} color="#333">
                    Chat Settings
                </Typography>
            </Grid>
            <Grid container px={2}>
                <Grid item xs={12} mb={2}>
                    <Typography {...style.title} >
                        Blocked users
                    </Typography>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {
                            users.map((user, i) => (
                                <>
                                    <ListItem
                                        secondaryAction={
                                            <Button onClick={() => socket.emit('unblock_room', user?.user_id)} variant='text'>Unblock</Button>
                                        }>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Typography fontWeight={500}>{user?.username}</Typography>}
                                            secondary={user?.user_id}
                                        />

                                    </ListItem>
                                    {
                                        i !== 0 || i + 1 !== users.length &&
                                        <Divider sx={{ width: '100%' }} />
                                    }
                                </>
                            ))
                        }
                    </List>
                </Grid>
            </Grid>
        </Grid>
    )
}
