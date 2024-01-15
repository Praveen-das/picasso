import { Box, Button, Chip, Typography } from '@mui/material';
import Status from '../../../../Status/Status';
import './productList.css'
import confirmAction from '../../../../ConfirmationDialog/ConfirmationDialog';
import useSales from '../../../../../Hooks/Sales/useSales';
import { calculateDiscount } from '../../../../../Utils/utils';
import { Link } from 'react-router-dom';

function ProductList({ order }) {
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

export default ProductList;
