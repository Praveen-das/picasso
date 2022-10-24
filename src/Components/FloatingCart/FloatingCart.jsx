import React, { useEffect, useState } from 'react'
import './floatingCart.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStore } from '../../Context/Store';
import { Link } from 'react-router-dom'

export default function FloatingCart({ loading = false }) {
    const cart = useStore(state => state.userData.cart)
    const [cartSize, setCartSize] = useState(0)

    useEffect(() => {
        if (loading) return
        setCartSize(cart.length)
    }, [loading, cart])

    return (
        <Link to='/checkout' data-cart={cartSize} className='floatingCart'>
            <ShoppingCartIcon className='floatingCart_icon' />
        </Link>
    )
}
