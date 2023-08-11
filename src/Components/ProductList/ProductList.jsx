import { Button, Chip, Typography } from '@mui/material';
import Status from '../Status/Status';
import './productList.css'
import confirmAction from '../ConfirmationDialog/ConfirmationDialog';
import useSales from '../../Hooks/Sales/useSales';
import { FlexBox } from '../Profile/MyWishlist/MyWishlist';
import { calculateDiscount } from '../../Utils/utils';
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

    return (
        <>
            <div className="checkout__product">
                <div className='product_imgNQty'>
                    <img src={order.cart_item.product.images[0].url + '/tr:w-100'} alt="" />
                </div>
                <div className='checkout__product--details'>
                    <Link to={`/shop/product/${order.cart_item.product?.id}`} >
                        <Typography textTransform='capitalize' fontSize={18} fontWeight={500} >{order.cart_item.product.name}</Typography>
                    </Link>
                    <FlexBox gap={1} color='grey' mt={0.25} fontWeight={500}>
                        <FlexBox alignItems='baseline' gap={2}>
                            <Typography color='var(--brandMain)' fontSize={20} fontWeight={600}>
                                ₹{order.cart_item.product.price - calculateDiscount(order.cart_item.product.price, order.cart_item.product.discount)}
                            </Typography>
                        </FlexBox>
                    </FlexBox>
                    <FlexBox gap={1} mt={2}>
                        <Status status={order.status} />
                        <Button disabled={order.status === 'cancelled'} onClick={() => cancelOrder()} sx={{ color: 'var(--brand)', minWidth: '80px', maxHeight: '22px', borderRadius: '25px' }} size='small'>Cancel</Button>
                    </FlexBox>
                </div>
                {/* <div className='orders_right'>
                    <label className='orderedDate' >Delivery by : {order.delivery_date}</label>
                    <br />
                </div> */}
            </div>
        </>
    )
}

export default ProductList;
