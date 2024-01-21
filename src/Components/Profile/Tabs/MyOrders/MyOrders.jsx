import { } from '@mui/material'
import { Fragment } from 'react'
import useCurrentUser from '../../../../Hooks/useCurrentUser'
import useSales from '../../../../Hooks/useSales';
import { NoOrdersScreen } from './NoOrdersScreen'

import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import Status from '../../../Ui/OrderStatus/Status';
import './style.css'
import confirmAction from '../../../Ui/ConfirmationDialog/ConfirmationDialog';
import { calculateDiscount } from '../../../../Utils/utils';
import { Link } from 'react-router-dom';

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

function SalesOrder({ order }) {
    const { updateStatus } = useSales()

    const cancelOrder = () => {
        confirmAction(
            'Cancel order',
            'Are you sure you want to  cancel this order ?',
            () => updateStatus.mutateAsync({ id: order.id, status: 'cancelled' }).then((response) => console.log(response)),
        )
    }

    const productPrice = order.cart_item.product.price - calculateDiscount(order.cart_item.product.price, order.cart_item.product.discount)

    return (
        <>
            <Box display='flex' gap={4}>
                <img className='img_border' width={100} height={100} src={order.cart_item.product.images[0].url + '/tr:w-100'} alt="" />
                <Box display='flex' flexDirection='column'>
                    <Link to={`/shop/product/${order.cart_item.product?.id}`} >
                        <Typography variant='paragraph'>{order.cart_item.product.name}</Typography>
                    </Link>
                    <Typography fontWeight={700} fontSize={18}>₹{productPrice}</Typography>
                    <Box display='flex' alignItems='center' gap={1} mt='auto'>
                        <Status status={order.status} />
                        <Button disabled={order.status === 'cancelled'} onClick={() => cancelOrder()} sx={{ color: 'var(--brand)', minWidth: '80px', maxHeight: '22px', borderRadius: '25px' }} size='small'>Cancel</Button>
                    </Box>
                </Box>
                {/* <div className='orders_right'>
                    <label className='orderedDate' >Delivery by : {order.delivery_date}</label>
                    <br />
                </div> */}
            </Box>
        </>
    )
}

export default MyOrders
