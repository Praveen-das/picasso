import Header from '../Components/Header/Header'
import Shop from '../Components/Shop/Shop'
import { ScrollRestoration } from 'react-router-dom'
import Sidebar from '../Components/Sidebar/Sidebar'
import { Grid } from '@mui/material'
import BreadCrumb from '../Components/Breadcrumbs/BreadCrumbs'

function ShoppingPage() {
    return (
        <div id='wrapper'>
            <ScrollRestoration />
            <Header />
            <BreadCrumb />
            <Grid container px={2} spacing={2} >
                <Grid item xs={2.5}>
                    <Sidebar />
                </Grid>
                <Grid item xs={9.5} display='flex' flexDirection='column' >
                    <Shop />
                </Grid>
            </Grid>
        </div>
    )
}

export default ShoppingPage
