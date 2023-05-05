import react, { useEffect, useRef } from 'react'
import './style.css'
import Cart from '@mui/icons-material/ShoppingCart';
import Wishlist from '@mui/icons-material/Favorite';
import Sell from '@mui/icons-material/Sell';
import Account from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'

function Menu({ open, close }) {
    const mounted = useRef(false)

    useEffect(() => {
        const elm = document.getElementById('backdrop')
        if (open) {
            document.documentElement.style.overflow = 'hidden'
            mounted.current = true
            elm.style.display = 'flex'
            elm.className = 'backdrop--show'
            return
        }
        if (!mounted.current) return
        elm.className = 'backdrop--hide'
        document.documentElement.style.overflow = 'initial'
        setTimeout(() => {
            elm.style.display = 'none'
            mounted.current = false
        }, 500)
    }, [open])

    return (
        <>
            <div onClick={close} id="backdrop"></div>
            <div style={{ transform: open && 'translateX(0%)' }} id='header_menu'>
                <div id='userProfile'>
                    <span></span>
                    <div>
                        <label id='userName' htmlFor="">User name</label>
                        <label id='varified' htmlFor="">Varified</label>
                    </div>
                </div>
                <ul>
                    <li >
                        <Link id='menu_link' to='/cart'>
                            <Cart className='menu_icon' />
                            Cart
                        </Link>
                    </li>
                    <li>
                        <Link id='menu_link' to='/#'>
                            <Wishlist className='menu_icon' />
                            Wishlist
                        </Link>
                    </li>
                    <li>
                        <Link id='menu_link' to='/sell'>
                            <Sell className='menu_icon' />
                            Sell
                        </Link>
                    </li>
                    <li>
                        <Link id='menu_link' to='/my-profile'>
                            <Account className='menu_icon' />
                            Account
                        </Link>
                    </li>
                    <li>
                        {/* <div id='menu_link' onClick={() => signout()}>
                            <Logout className='menu_icon' />
                            Logout
                        </div> */}
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Menu