import { useState } from 'react'
import Shop from '../Components/Shop/Shop'
import Sidebar from '../Components/Layouts/Sidebar/Sidebar'
import { Grid } from '@mui/material'

function ShoppingPage() {
    const [toggleFilter, setToggleFilter] = useState(true)
    return (
        <>
            <Grid container spacing={2} px={2} >
                {
                    toggleFilter &&
                    <Grid item xs={2.5}>
                        <Sidebar />
                    </Grid>
                }
                <Grid item xs display='flex' flexDirection='column' >
                    <Shop toggleFilter={toggleFilter} setToggleFilter={setToggleFilter} />
                </Grid>
            </Grid >
        </>
    )
}

export default ShoppingPage
