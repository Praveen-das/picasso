import { lazy } from 'react'
import EmptyCart from '../Components/ShoppingCart/EmptyCart'
import { useCart } from '../Hooks/useCart'
const Cart = lazy(() => import('../Components/ShoppingCart/Cart'))

function ShoppingCartPage() {
    const { cart: { data } } = useCart()
    let cart_items = data?.[0] || []

    if (!cart_items.length) return <EmptyCart />
    return (
        <>
            <Cart data={cart_items} />
        </>
    )
}

export default ShoppingCartPage
