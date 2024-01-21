import { Box, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { StyledTab, StyledTabs, TabPanel, tabStyling } from '../Ui/TabComponents';
import Dashboard from './Tabs/Dashboard/Dashboard';
import Products from './Tabs/Products/Products';
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
        <Box id='dashboard_container' display='flex' justifyContent='center' flexDirection={{ xs: 'column', lg: 'row' }} flexWrap={{ lg: 'wrap' }} gap={{ sm: 4,md: 4, lg: 14 }} px={4} >
            <StyledTabs
                textColor='primary'
                orientation={lg ? 'vertical' : 'horizontal'}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
            >
                <StyledTab
                    icon={<DashboardIcon fontSize='small' />}
                    label="Dashboard"
                    {...tabStyling}
                />
                <StyledTab
                    icon={<ProductsIcon
                        fontSize='small' />}
                    label="Manage Products"
                    {...tabStyling}
                />
            </StyledTabs>
            <TabPanel value={value} index={0}>
                <Dashboard />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Products />
            </TabPanel>
        </Box>
    );
}
