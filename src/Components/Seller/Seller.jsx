import { Grid, Paper, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TabPanel } from './TabPannel';
import Dashboard from '../SellerComponents/Dashboard/Dashboard';
import Products from '../SellerComponents/Products/Products';
import logo from '../../Assets/Icons/logo.png'
import { Link } from 'react-router-dom'
import './style.css'

export default function Seller() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: '1rem',
        marginTop: '-3rem',
        minHeight: '80vh',
        color: theme.palette.text.primary,
        borderRadius: '10px'
    }));

    return (
        <Grid container sx={{ flexGrow: 1, bgcolor: 'background.paper' }} mt={5}>
            <Grid item xs={1} minWidth={200} pl={1}>
                <div className='tabWrapper'>
                    <Link to='/' className="admin-logo">
                        <img src={logo} alt="" />
                        <label htmlFor="">Picasso.</label>
                    </Link>
                    <Tabs textColor='primary' orientation="vertical" value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab sx={{ alignItems: 'flex-start' }} label="Dashboard" />
                        <Tab sx={{ alignItems: 'flex-start' }} label="Products" />
                    </Tabs>
                </div>
            </Grid>
            <Grid item xs >
                <TabPanel value={value} index={0}>
                    <Item elevation={4}>
                        <Dashboard />
                    </Item>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Item elevation={4}>
                        <Products />
                    </Item>
                </TabPanel>
            </Grid>
        </Grid>
    );
}
