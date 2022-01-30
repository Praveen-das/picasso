import { Box, Grid, Paper, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import ProfileDetails from './ProfileDetails'
import ManageAddress from './ManageAddress'
import { styled } from '@mui/material/styles';
import MyOrders from './MyOrders'

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
        marginTop: '-3rem',
        minHeight: '100px',
        color: theme.palette.text.primary,
        borderRadius: '10px',
    }));

    return (
        <Grid container sx={{ flexGrow: 1, bgcolor: 'background.paper' }} mt={12}>
            <Grid item xs={1} minWidth={200}>
                <Tabs textColor='primary' orientation="vertical" value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="My Orders" />
                    <Tab label="Personal Details" />
                    <Tab label="Manage Address" />
                </Tabs>
            </Grid>
            <Grid item xs>
                <TabPanel value={value} index={0}>
                    <Item elevation={4}>
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
