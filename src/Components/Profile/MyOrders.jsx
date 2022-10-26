import { Button, Typography } from '@mui/material'
import react from 'react'
import { useStore } from '../../Context/Store'
import ProductList from '../ProductList/ProductList'
import { ReactComponent as NoOrders } from '../../Assets/Images/noorders.svg'
import { useNavigate } from 'react-router-dom'

function MyOrders() {
    const orders = useStore(state => state?.database?.userOrders)
    const navigate = useNavigate()

    return (
        <>

            {
                    orders?.length === 0 ?
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
                        orders?.map((product, index) =>
                            <ProductList key={index} product={product} />
                        )
            }
        </>
    )
}

export default MyOrders
