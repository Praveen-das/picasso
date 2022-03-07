import React from 'react';
import './checkout.css'
import { ReactComponent as Empty_cart } from '../../Assets/Images/empty_cart.svg'

function EmptyCart() {
    return <>
        <div className="emptyCart">
            <div>
                <label htmlFor="">Your cart is empty.</label>
                <Empty_cart height={300} />
            </div>
        </div>
    </>;
}

export default EmptyCart;
