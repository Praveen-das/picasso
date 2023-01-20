import react, { useEffect, useState } from 'react'
import './floatingCart.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStore } from '../../Context/Store';
import { Link } from 'react-router-dom'
import { useCart } from '../../Hooks/useCart';

export default function FloatingCart() {
    const { cart: cart_items } = useCart()
    const [_, { count }] = cart_items.data || [[], { count: 0 }]
    
    return (
        <Link to='/cart' data-cart={count} className='floatingCart'>
            <ShoppingCartIcon sx={{ color: 'white' }} className='floatingCart_icon' />
        </Link>
    )
}
