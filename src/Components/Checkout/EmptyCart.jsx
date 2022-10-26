import react from 'react';
import './checkout.css'
import { ReactComponent as EMPTY_CART } from '../../Assets/Images/empty_cart.svg'

function EmptyCart() {
    return <>
        <div className="emptyCart">
            <div>
                <label htmlFor="">Your cart is empty.</label>
                <EMPTY_CART height={300} />
            </div>
        </div>
    </>;
}

export default EmptyCart;
