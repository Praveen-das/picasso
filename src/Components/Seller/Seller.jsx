import { Box, Tab, Tabs, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Item, StyledTab, StyledTabs, TabPanel, tabStyling } from '../MUIComponents/TabComponents';
import Dashboard from '../SellerComponents/Dashboard/Dashboard';
import Products from '../SellerComponents/Products/Products';
import './style.css'

import DashboardIcon from '@mui/icons-material/LineAxis';
import ProductsIcon from '@mui/icons-material/LocalMallOutlined';

export default function Seller() {
    const [value, setValue] = useState(0);
    const lg = useMediaQuery((theme) => theme.breakpoints.up('lg'))

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box display='flex' flexDirection={{ xs: 'column', lg: 'row' }} flexWrap={{ lg: 'wrap' }} gap={2} >
            <Box mt={'0.5rem'}>
                <StyledTabs
                    textColor='primary'
                    orientation={lg ? 'vertical' : 'horizontal'}
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{
                        pl: 2,
                        height: { lg: '100%' },
                    }}
                >
                    <StyledTab icon={<DashboardIcon fontSize='small' />} label="Dashboard" {...tabStyling} />
                    <StyledTab icon={<ProductsIcon fontSize='small' />} label="Manage Products" {...tabStyling} />
                </StyledTabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Item >
                    <Dashboard />
                </Item>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Item >
                    <Products />
                </Item>
            </TabPanel>
        </Box>
    );
}
