import { Box, Grid, Paper, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import ProfileDetails from './ProfileDetails'
import ManageAddress from './ManageAddress'
import { styled } from '@mui/material/styles';
import MyOrders from './MyOrders'

import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';

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
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function UserProfile() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: '1rem',
        // marginTop: '-2rem',
        position: 'relative',
        minHeight: 'calc(100vh - 9rem)',
        color: theme.palette.text.primary,
        borderRadius: '10px',
        boxShadow: '-5px 5px 20px 2px var(--shadow)'
    }));

    return (
        <Grid container sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
            <Grid item sx={{
                paddingTop: 3
            }} xs={1} minWidth={250}>
                <Tabs textColor='primary' orientation="vertical" value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{ ml: 2, minHeight: 50, justifyContent: 'left' }} iconPosition='start' icon={<LocalMallIcon fontSize='small' />} label="My Orders" />
                    <Tab sx={{ ml: 2, minHeight: 50, justifyContent: 'left' }} iconPosition='start' icon={<PersonIcon fontSize='small' />} label="Personal Details" />
                    <Tab sx={{ ml: 2, minHeight: 50, justifyContent: 'left' }} iconPosition='start' icon={<HomeIcon fontSize='small' />} label="Manage Address" />
                </Tabs>
            </Grid>
            <Grid item xs>
                <TabPanel value={value} index={0}>
                    <Item elevation={4} >
                        <MyOrders />
                    </Item>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Item elevation={4}>
                        <ProfileDetails />
                    </Item>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Item elevation={4}>
                        <ManageAddress />
                    </Item>
                </TabPanel>
            </Grid>
        </Grid>
    )
}

export default UserProfile
