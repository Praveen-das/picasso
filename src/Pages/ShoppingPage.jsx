import Shop from '../Components/Shop/Shop'
import { ScrollRestoration } from 'react-router-dom'
import Sidebar from '../Components/Sidebar/Sidebar'
import { Grid } from '@mui/material'

function ShoppingPage() {
    return (
        <div id='wrapper'>
            <ScrollRestoration />
            <Grid container  spacing={2} >
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
