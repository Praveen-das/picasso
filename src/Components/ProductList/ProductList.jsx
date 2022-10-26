import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import react, { useEffect, useState } from 'react';
import Status from '../Status/Status';
import './productList.css'
import { useDatabase } from '../../Hooks/useDatabase';
import { confirmAction } from '../ConfirmationDialog/ConfirmationDialog';

function ProductList({ product }) {
    const [status, setStatus] = useState('')
    const { handleOrder } = useDatabase()

    const cancelOrder = () => {
        confirmAction(
            'Cancel order',
            'Are you sure you want to  cancel the order ?',
            () => handleOrder('Cancelled', product.id),
        )
    }

    useEffect(() => {
        setStatus(product.status)
    }, [product.status])

    if (!product) return
    return (
        <>
            <div className="checkout__product">
                <img src={product.products.image[0] + '/tr:w-100'} alt="" />
                <div className='checkout__product--details'>
                    <div><label className='checkout__product--name' htmlFor="">{product.products.name}</label></div>
                    <Typography width='90%' variant='caption' fontSize={14}>{product.products.description}</Typography>
                    <span></span>
                    <div id='statusAndCancel'>
                        <Status status={status} />
                        {status !== 'Cancelled' && <Button onClick={() => cancelOrder()} sx={{ color: 'var(--brand)', minWidth: '80px', maxHeight: '22px', borderRadius: '25px' }} size='small'>Cancel</Button>}
                    </div>
                </div>
                <div className='orders_right'>
                    <label className='orderedDate' htmlFor="">Delivery by : {product.delivery_date}</label>
                    <br />
                    <label className='price' htmlFor="">Rs. {product.products.price}</label>
                </div>
            </div>
        </>
    )
}

export default ProductList;
