import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Status from '../Status/Status';
import './productList.css'
import confirmAction from '../ConfirmationDialog/ConfirmationDialog';
import useSales from '../../Hooks/Sales/useSales';

function ProductList({ order }) {
    const { updateStatus } = useSales()
    console.log(order);
    const cancelOrder = () => {
        confirmAction(
            'Cancel order',
            'Are you sure you want to  cancel this order ?',
            () => updateStatus.mutateAsync({ id: order.id, status: 'cancelled' }).then((response) => console.log(response)),
        )
    }

    return (
        <>
            <div className="checkout__product">
                <img src={order.cart_item.product.images[0].url + '/tr:w-100'} alt="" />
                <div className='checkout__product--details'>
                    <div><label className='checkout__product--name' htmlFor="">{order.cart_item.product.name}</label></div>
                    <Typography width='90%' variant='caption' fontSize={14}>{order.cart_item.product.desc}</Typography>
                    <span></span>
                    <div id='statusAndCancel'>
                        <Status status={order.status} />
                        <Button disabled={order.status === 'cancelled'} onClick={() => cancelOrder()} sx={{ color: 'var(--brand)', minWidth: '80px', maxHeight: '22px', borderRadius: '25px' }} size='small'>Cancel</Button>
                    </div>
                </div>
                <div className='orders_right'>
                    <label className='orderedDate' htmlFor="">Delivery by : {order.delivery_date}</label>
                    <br />
                    <label className='price' htmlFor="">Rs. {order.cart_item.price}</label>
                </div>
            </div>
        </>
    )
}

export default ProductList;
