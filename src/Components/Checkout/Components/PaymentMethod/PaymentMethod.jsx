import React, { useState } from 'react'
import { Radio, Typography } from '@mui/material';
import './paymentMethod.css'

function PaymentMethod({ setMethod, method }) {

    return (
        <>
            <div className="paymentMethod">
                <Radio checked={method === 'card'} onChange={() => setMethod('card')} />
                <Typography onClick={() => setMethod('card')} variant='h6' fontSize={14} fontWeight={600}>Pay with Debit/Credit/ATM Cards</Typography>
            </div>
            <div className="paymentMethod">
                <Radio checked={method === 'net_banking'} onChange={() => setMethod('net_banking')} />
                <Typography onClick={() => setMethod('net_banking')} variant='h6' fontSize={14} fontWeight={600}>Net Banking</Typography>
            </div>
            <div className="paymentMethod">
                <Radio checked={method === 'upi'} onChange={() => setMethod('upi')} />
                <Typography onClick={() => setMethod('upi')} variant='h6' fontSize={14} fontWeight={600}>Other UPI Apps</Typography>
            </div>
            <div className="paymentMethod">
                <Radio checked={method === 'cod'} onChange={() => setMethod('cod')} />
                <Typography onClick={() => setMethod('cod')} variant='h6' fontSize={14} fontWeight={600}>Cash On Delivery/Pay On Delivery</Typography>
            </div>
        </>
    );
}

export default PaymentMethod