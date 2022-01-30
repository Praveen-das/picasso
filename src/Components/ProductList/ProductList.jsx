import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef } from 'react';
import Status from '../Status/Status';
import './productList.css'

function ProductList({ product }) {

    if (!product) return
    return <>
        <div className="checkout__product">
            <img src={product.product.image} alt="" />
            <div className='checkout__product--details'>
                <div><label className='checkout__product--name' htmlFor="">{product.product.name}</label></div>
                <Typography width='90%' variant='caption' fontSize={14}>{product.product.description}</Typography>
                <div id='statusAndCancel'>
                    <Status status={product.status}/>
                    <Button sx={{color:'var(--brand)', minWidth:'80px',maxHeight:'22px', borderRadius:'25px'}} size='small'>Cancel</Button>
                </div>
            </div>
            <div className='checkout__product--price'>
                <label htmlFor="">Rs. {product.product.price}</label>
            </div>
        </div>
    </>;
}

export default ProductList;
