import { Button, Divider, Grid, Typography } from '@mui/material'
import SalesOrder from '../../ProductList/ProductList'
import { ReactComponent as NoOrders } from '../../../Assets/Images/noorders.svg'
import { useNavigate } from 'react-router-dom'
import { Fragment } from 'react'
import useCurrentUser from '../../../Hooks/useCurrentUser'

function MyOrders() {
    const { currentUser } = useCurrentUser();
    const orders = currentUser.data?.sales_order_personTosales_order_customer_id
    const navigate = useNavigate()

    return (
        <Grid item xs={12} display='grid' pl={2} gap={3}>
            <Grid item xs={12} ml={-2}>
                <Typography variant="h5" fontWeight={800} color="#333">
                    My Orders({orders?.length})
                </Typography>
            </Grid>
            {
                !orders?.length ?
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.2rem',
                        marginTop: -100
                    }}>
                        <NoOrders height={200} style={{ marginRight: -20, marginBottom: '2.5rem' }} />
                        <Typography color='#000' variant='h6' fontSize={22}>NO ORDERS FOUND</Typography>
                        <Typography color='#555' fontWeight={500} fontSize={16}>Looks like you haven't made any orders yet</Typography>
                        <Button onClick={() => navigate('/shop')} sx={{ mt: 3 }} variant='contained'>Back to shopping</Button>
                    </div>
                    :
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
