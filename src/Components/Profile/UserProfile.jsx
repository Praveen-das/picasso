
import { useLocation } from 'react-router-dom'
import { Box, useMediaQuery } from '@mui/material'

import LocalMallIcon from '@mui/icons-material/LocalMallOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import ProfileDetails from './ProfileDetails/ProfileDetails'
import ManageAddress from './ManageAddress/ManageAddress'
import MyOrders from './MyOrders/MyOrders'
import MyWishlist from './MyWishlist/MyWishlist'
import MessengerSettings from './MessengerSettings/MessengerSettings'
import { useEffect, useState } from 'react';
import { StyledTab, StyledTabs, TabPanel, tabStyling } from '../MUIComponents/TabComponents';
import Messenger from '../Messenger/Messenger';

function UserProfile() {
    const location = useLocation()
    const [tab, setTab] = useState(location.state?.tab || 0)

    useEffect(() => {
        const tabs = location.state?.tab || 0
        setTab(tabs)
    }, [location])

    const lg = useMediaQuery((theme) => theme.breakpoints.up('lg'))

    const handleChange = (_, newValue) => {
        setTab(newValue)
    };

    return (
        <Box display='flex' justifyContent='center' flexDirection={{ xs: 'column', lg: 'row' }} flexWrap={{ lg: 'wrap' }} gap={14} pl={4} >
            <StyledTabs
                textColor='primary'
                orientation={lg ? 'vertical' : 'horizontal'}
                value={tab}
                onChange={handleChange}
                aria-label="basic tabs example"
            >
                <StyledTab
                    {...tabStyling}
                    icon={<PersonIcon fontSize='small' />}
                    label="My Profile"
                />
                <StyledTab
                    {...tabStyling}
                    icon={<ChatBubbleIcon fontSize='small' />}
                    label="Chats"
                />
                <StyledTab
                    {...tabStyling}
                    icon={<LocalMallIcon fontSize='small' />}
                    label="My Orders"
                />
                <StyledTab
                    {...tabStyling}
                    icon={<FavoriteBorderIcon fontSize='small' />}
                    label="My Wishlist"
                />
                {/* <StyledTab
                        {...tabStyling}
                        icon={<HomeIcon fontSize='small' />}
                        label="Manage Address"
                    /> */}
                <StyledTab
                    {...tabStyling}
                    icon={<ChatBubbleIcon fontSize='small' />}
                    label="Chat Settings"
                />
            </StyledTabs>
            <TabPanel value={tab} index={0}>
                <ProfileDetails />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Messenger />
            </TabPanel>
            <TabPanel value={tab} index={2}>
                <MyOrders />
            </TabPanel>
            <TabPanel value={tab} index={3}>
                <MyWishlist />
            </TabPanel>
            {/* <TabPanel value={tab} index={4}>
                <ManageAddress />
            </TabPanel> */}
            <TabPanel value={tab} index={4}>
                <MessengerSettings />
            </TabPanel>
        </Box>
    )
}

export default UserProfile

