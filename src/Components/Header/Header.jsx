import { useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import Login from '../Login/Login'
import DropDown from '../DropDown/DropDown'
import Avatar from '../Avatar/Avatar'
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search'
import { useAuth } from '../../Hooks/useAuth'
import AccountsIcon from '@mui/icons-material/ManageAccounts';
import CartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { useStore } from '../../Context/Store'
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from './Device/Menu'

function Header() {
    const { signout } = useAuth()
    const user = useStore(state => state?.auth?.user)
    const [model, setModel] = useState(false)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const handleSearch = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            if (!e.target.value) return
            navigate(`/search/${e.target.value}`)
        }
    }

    const style = {
        sx: {
            fontSize: 16,
            display: 'block'
        }
    }

    const hover = () => {
        let elements = document.getElementsByName('dropdown-menu-item')
        document.documentElement.style.setProperty("--opacity", 1);

        elements.forEach((elm, index) => {
            elm.onmouseenter = () => {
                if (index === 0) {
                    document.documentElement.style.setProperty("--top", 0);
                }
                if (index === 1) {
                    document.documentElement.style.setProperty("--top", '25%');
                }
                if (index === 2) {
                    document.documentElement.style.setProperty("--top", '50%');
                }
                if (index === 3) {
                    document.documentElement.style.setProperty("--top", '75%');
                }
            }
        })
    }

    return (
        <>
            <Login model={model} setModel={setModel} />
            <div
                className="navbar"
            >
                {/* <IconButton onClick={() => setOpen(!open)} sx={{ position: 'absolute', left: '8px' }}>
                    <MenuIcon />
                </IconButton>
                <Menu open={open} close={() => setOpen(!open)} /> */}
                <div className="left">
                    <Link to='/'>
                        <span className="logo">
                            {/* <img src={logo} alt="" /> */}
                            <label className='header_brandName' htmlFor="logo">ARTWORLD.</label>
                        </span>
                    </Link>
                </div>
                <div className="right">
                    <Search onKeyUp={(e) => handleSearch(e)} />
                    <Link to='/shop' className='shop' htmlFor="">SHOP</Link>
                    <Link to='/sell' className='marketplace' htmlFor="">SELL</Link>
                    {/* <Badge badgeContent={userData && userData.cart ? userData.cart.length : 0} color="primary">
                        <Link to='/checkout' className='create' htmlFor="">CART</Link>
                    </Badge> */}
                    {
                        user != null ?
                            <DropDown>
                                <Avatar displayName={user?.displayName} profilePicture={user?.photoURL} />
                                <Link to='/my-profile'>
                                    <AccountsIcon {...style} />
                                    Account</Link>
                                <Link to='/checkout'>
                                    <CartIcon {...style} />
                                    My Cart</Link>
                                <Link to='/checkout'>
                                    <FavoriteIcon {...style} />
                                    Wishlist</Link>
                                <div onClick={() => signout()}>
                                    <LogoutIcon {...style} />
                                    Logout</div>
                            </DropDown>
                            :
                            <button onClick={() => setModel(!model)} className="login">LOG IN</button>
                    }
                </div>
                {/* <IconButton sx={{ position: 'absolute', right: '8px' }}>
                    <SearchIcon />
                </IconButton> */}
            </div>
        </>
    )
}

export default Header
