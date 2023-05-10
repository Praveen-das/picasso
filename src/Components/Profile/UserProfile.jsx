import ProfileDetails from './ProfileDetails/ProfileDetails'
import ManageAddress from './ManageAddress/ManageAddress'
import MyOrders from './MyOrders/MyOrders'
import MyWishlist from './MyWishlist/MyWishlist'

import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Tab, Tabs } from '@mui/material'

import LocalMallIcon from '@mui/icons-material/LocalMallOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation, useNavigate } from 'react-router-dom'
import { MessengerSettings } from './MessengerSettings/MessengerSettings'


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
    const navigate = useNavigate()
    const { tab } = useLocation().state

    const handleChange = (_, newValue) => {
        navigate('/profile', { state: { tab: newValue } })
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
                <CTabs value={tab} onChange={handleChange}>
                    <Tab {...tabStyling} icon={<PersonIcon fontSize='small' />} label="Personal Details" />
                    <Tab {...tabStyling} icon={<LocalMallIcon fontSize='small' />} label="My Orders" />
                    <Tab {...tabStyling} icon={<FavoriteBorderIcon fontSize='small' />} label="My Wishlist" />
                    <Tab {...tabStyling} icon={<HomeIcon fontSize='small' />} label="Manage Address" />
                    <Tab {...tabStyling} icon={<ChatBubbleIcon fontSize='small' />} label="Chat Settings" />
                </CTabs>
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

