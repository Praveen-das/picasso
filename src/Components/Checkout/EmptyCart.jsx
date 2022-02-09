import React from 'react';
import './checkout.css'
import empty_cart from '../../Assets/Images/empty_cart.svg'

function EmptyCart() {
    return <>
        <div className="emptyCart">
            <div>
                <label htmlFor="">Your cart is empty.</label>
                <img width={400} src={empty_cart} alt="" />
            </div>
        </div>
    </>;
}

export default EmptyCart;
