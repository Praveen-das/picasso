
import { useLocation, useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Tab, Tabs } from '@mui/material'

import LocalMallIcon from '@mui/icons-material/LocalMallOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import useMediaQuery from '@mui/material/useMediaQuery';

import ProfileDetails from './ProfileDetails/ProfileDetails'
import ManageAddress from './ManageAddress/ManageAddress'
import MyOrders from './MyOrders/MyOrders'
import MyWishlist from './MyWishlist/MyWishlist'
import MessengerSettings from './MessengerSettings/MessengerSettings'
import { useState } from 'react';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <>
            {value === index && (
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        minHeight: '100%',
                        boxShadow: { xs: 'none', md: '-5px -2px 30px -4px #b5d0ff7a' }
                    }}
                    {...other}
                >
                    {children}
                </Box>
            )}
        </>
    );
}

function UserProfile() {
    const md = useMediaQuery('(min-width:900px)')
    const [tab, setTab] = useState(0)

    const handleChange = (_, newValue) => {
        setTab(newValue)
    };

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        minHeight: '100%',
        position: 'relative',
        color: theme.palette.text.primary,
    }));

    const itemStyling = {
        sx: {
            minHeight: '100%',
            padding: { md: '2rem 3rem' },

        },
        elevation: 0
    }

    const tabStyling = {
        sx: { minHeight: 50, justifyContent: 'left', gap: 2 }, iconPosition: 'start'
    }

    return (
        <Grid container px={2} pb={2} spacing={2} minHeight='var(--fullHeight)'>
            <Grid item md={3}>
                <Tabs
                    textColor='primary'
                    orientation={md ? 'vertical' : 'horizontal'}
                    value={tab}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{
                        pl: 2,
                        boxShadow: { xs: 'none', md: '5px -2px 30px -4px #b5d0ff7a' },
                        minHeight: '100%'
                    }}
                >
                    <Tab {...tabStyling} icon={<PersonIcon fontSize='small' />} label="Personal Details" />
                    <Tab {...tabStyling} icon={<LocalMallIcon fontSize='small' />} label="My Orders" />
                    <Tab {...tabStyling} icon={<FavoriteBorderIcon fontSize='small' />} label="My Wishlist" />
                    <Tab {...tabStyling} icon={<HomeIcon fontSize='small' />} label="Manage Address" />
                    <Tab {...tabStyling} icon={<ChatBubbleIcon fontSize='small' />} label="Chat Settings" />
                </Tabs>
            </Grid>
            <Grid item xs={12} md>
                <TabPanel value={tab} index={0}>
                    <Item {...itemStyling} >
                        <ProfileDetails />
                    </Item>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Item {...itemStyling}>
                        <MyOrders />
                    </Item>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <Item {...itemStyling}>
                        <MyWishlist />
                    </Item>
                </TabPanel>
                <TabPanel value={tab} index={3}>
                    <Item {...itemStyling}>
                        <ManageAddress />
                    </Item>
                </TabPanel>
                <TabPanel value={tab} index={4}>
                    <Item {...itemStyling}>
                        <MessengerSettings />
                    </Item>
                </TabPanel>
            </Grid>
        </Grid>
    )
}

export default UserProfile

