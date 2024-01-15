import { Divider, Grid, Typography } from '@mui/material'
import SalesOrder from './Components/ProductList/ProductList'
import { Fragment } from 'react'
import useCurrentUser from '../../../Hooks/useCurrentUser'
import { NoOrdersScreen } from './NoOrdersScreen'
import LoadingScreen from '../../MUIComponents/LoadingScreen'


function MyOrders() {
    const { currentUser } = useCurrentUser();
    const orders = currentUser.data?.sales_order_personTosales_order_customer_id

    if (!orders?.length) return <NoOrdersScreen />
    return (
        <Grid item xs={12} display='grid' pl={2} gap={3}>
            <Grid item xs={12} ml={-2} mb={1}>
                <Typography variant="tabTitle">My Orders - {orders?.length}</Typography>
            </Grid>
            {
                orders?.map((order, key) =>
                    <Fragment key={orders?.id || key}>
                        <SalesOrder order={order} />
                        {
                            orders && orders[key + 1] &&
                            <Divider variant='fullWidth' />
                        }
                    </Fragment>
                )
            }
        </Grid>
    )
}

export default MyOrders
