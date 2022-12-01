import react, { useEffect, useState } from 'react'
import './floatingCart.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStore } from '../../Context/Store';
import { Link } from 'react-router-dom'
import { useCart } from '../../Hooks/useCart';

export default function FloatingCart({ loading = false }) {
    const { cart } = useCart()

    return (
        <Link to='/checkout' data-cart={cart.data?.length || 0} className='floatingCart'>
            <ShoppingCartIcon sx={{color:'white'}} className='floatingCart_icon' />
        </Link>
    )
}
