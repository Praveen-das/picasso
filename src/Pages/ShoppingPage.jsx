import Shop from '../Components/Shop/Shop'
import Sidebar from '../Components/Sidebar/Sidebar'
import { Grid } from '@mui/material'

function ShoppingPage() {
    return (
        <>
            <Grid container spacing={2} px={2} >
                <Sidebar />
                <Grid item xs display='flex' flexDirection='column' >
                    <Shop />
                </Grid>
            </Grid>
        </>
    )
}

export default ShoppingPage
