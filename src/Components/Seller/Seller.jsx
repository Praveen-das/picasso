import { Grid, Paper, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TabPanel } from './TabPannel';
import Dashboard from '../SellerComponents/Dashboard/Dashboard';
import Products from '../SellerComponents/Products/Products';
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
        minHeight: '100px',
        color: theme.palette.text.primary,
        borderRadius: '10px',
        boxShadow: '-5px 5px 20px 2px var(--shadow)'
    }));

    return (
        <Grid container sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
            <Grid item xs={1} minWidth={200}>
                <div className='admin_brandName--wrapper'>
                    <Link to='/' className='header_brandName admin_brandName'>ARTWORLD</Link>
                </div>
                <Tabs textColor='primary' orientation="vertical" value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{ alignItems: 'center' }} label="Dashboard" />
                    <Tab sx={{ alignItems: 'center' }} label="Products" />
                </Tabs>
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
