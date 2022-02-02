import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import Status from '../Status/Status';
import './productList.css'
import { useFirebase } from '../../Context/FirebaseContext'
import Alert from '../Alert/Alert'

function ProductList({ product }) {
    const [dialog, setDialog] = useState('')
    const { handleOrder } = useFirebase()


    const handleOrders = () => {
        setDialog({
            open: true,
            confirmationMessage: 'Are you sure you want to cancel the order ?',
            successMessage: 'Order cancelled successfully',
            onConfirmation: () => handleOrder('Cancelled', product.order_id),
            type: 'confirmation'
        })
    }

    if (!product) return
    return <>
        <Alert dialog={dialog} setDialog={setDialog} />
        <div className="checkout__product">
            <img src={product.product.image} alt="" />
            <div className='checkout__product--details'>
                <div><label className='checkout__product--name' htmlFor="">{product.product.name}</label></div>
                <Typography width='90%' variant='caption' fontSize={14}>{product.product.description}</Typography>
                <div id='statusAndCancel'>
                    <Status status={product.status} />
                    {product.status !== 'Cancelled' && <Button onClick={() => handleOrders()} sx={{ color: 'var(--brand)', minWidth: '80px', maxHeight: '22px', borderRadius: '25px' }} size='small'>Cancel</Button>}
                </div>
            </div>
            <div className='checkout__product--price'>
                <label htmlFor="">Rs. {product.product.price}</label>
            </div>
        </div>
    </>;
}

export default ProductList;
