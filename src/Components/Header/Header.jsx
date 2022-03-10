import { useRef, useState, useLayoutEffect } from 'react'
import './header.css'
import logo from '../../Assets/Icons/logo.png'
import { useEffect } from 'react/cjs/react.development'
import { Link } from 'react-router-dom'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import { useFirebase } from '../../Context/FirebaseContext'
import DropDown from '../DropDown/DropDown'
import Avatar from '../Avatar/Avatar'
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search'


function Header() {
    const [toggleHeader, setToggleHeader] = useState(false)
    const [model, setModel] = useState(false)
    const scrollValue = useRef(0)

    const navigate = useNavigate()

    const { currentUser, userData, signout } = useFirebase()

    const handleSearch = (query) => {
        navigate(`/search/${query}`)
    }

    return (
        <>
            <Login model={model} setModel={setModel} />
            <div
                className="navbar"
                style={{
                    top: toggleHeader ? '-4rem' : '0'
                }}
            >
                <div className="left">
                    <Link to='/'>
                        <span className="logo">
                            {/* <img src={logo} alt="" /> */}
                            <label className='header_brandName' htmlFor="logo">ARTWORLD.</label>
                        </span>
                    </Link>
                </div>
                <div className="right">
                    <Search callback={(query) => handleSearch(query)} />
                    <Link to='/shop' className='shop' htmlFor="">SHOP</Link>
                    <Link to='/sell' className='marketplace' htmlFor="">SELL</Link>
                    {/* <Badge badgeContent={userData && userData.cart ? userData.cart.length : 0} color="primary">
                        <Link to='/checkout' className='create' htmlFor="">CART</Link>
                    </Badge> */}
                    {
                        currentUser ?
                            <DropDown menu={
                                <Avatar displayName={currentUser.displayName} profilePicture={currentUser.photoURL} />
                            }>
                                <Link to='/my-profile'>My Profile</Link>
                                <div onClick={() => signout()}>Logout</div>
                            </DropDown>
                            :
                            <button onClick={() => setModel(!model)} className="login">LOG IN</button>
                    }
                </div>
            </div>
        </>
    )
}

export default Header
