import { Box, Grid, Paper, Tab, Tabs } from '@mui/material'
import react, { useState } from 'react'
import ProfileDetails from './ProfileDetails'
import ManageAddress from './ManageAddress'
import MyOrders from './MyOrders'

import { styled } from '@mui/material/styles';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import useMediaQuery from '@mui/material/useMediaQuery';


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
    const [value, setValue] = useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        position: 'relative',
        minHeight: 'calc(100vh - 9rem)',
        color: theme.palette.text.primary,
        borderRadius: '10px'
    }));

    const tabStyling = {
        sx: {
            padding: { md: '2rem 3rem' },
            boxShadow: { xs: 'none', md: '-5px 5px 20px 2px var(--shadow)' }

        },
        elevation: 0
    }

    return (
        <Grid container sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
            <Grid item sx={{ paddingTop: { xs: 0, md: 3 }, paddingLeft: { xs: 0, sm: 1, md: 0 } }} xs={12} md={2} >
                <CTabs value={value} onChange={handleChange}>
                    <Tab sx={{ minHeight: 50, justifyContent: 'left' }} iconPosition='start' icon={<LocalMallIcon fontSize='small' />} label="My Orders" />
                    <Tab sx={{ minHeight: 50, justifyContent: 'left' }} iconPosition='start' icon={<PersonIcon fontSize='small' />} label="Personal Details" />
                    <Tab sx={{ minHeight: 50, justifyContent: 'left' }} iconPosition='start' icon={<HomeIcon fontSize='small' />} label="Manage Address" />
                </CTabs>
            </Grid>
            <Grid item xs={12} md>
                <TabPanel value={value} index={0}>
                    <Item {...tabStyling} >
                        <MyOrders />
                    </Item>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Item {...tabStyling}>
                        <ProfileDetails />
                    </Item>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Item {...tabStyling}>
                        <ManageAddress />
                    </Item>
                </TabPanel>
            </Grid>
        </Grid>
    )
}

export default UserProfile
