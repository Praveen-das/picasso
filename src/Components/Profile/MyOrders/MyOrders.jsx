import { Button, Typography } from '@mui/material'
import SalesOrder from '../../ProductList/ProductList'
import { ReactComponent as NoOrders } from '../../../Assets/Images/noorders.svg'
import { useNavigate } from 'react-router-dom'
import useOrders from "../../../Hooks/Sales/useOrders"

function MyOrders() {
    const orders = useOrders()
    const navigate = useNavigate()

    return (
        <>
            {
                !orders.data?.length ?
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
                    orders.data?.map((order) =>
                        <SalesOrder key={order.id} order={order} />
                    )
            }
        </>
    )
}

export default MyOrders
