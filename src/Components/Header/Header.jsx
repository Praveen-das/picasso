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
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';


function Header() {
    const [toggleHeader, setToggleHeader] = useState(false)
    const [model, setModel] = useState({ login: false, signup: false })
    const scrollValue = useRef(0)
    const [active, setActive] = useState(false)
    const previousValue = useRef()
    const searchbox_wrapper = useRef()
    const searchbox = useRef()
    const [searchQuery, setSearchQuery] = useState()
    const navigate = useNavigate()

    const { currentUser, userData, signout } = useFirebase()

    document.onclick = (e) => {
        if (!active) return
        if (!searchbox_wrapper.current.contains(e.target)) {
            setActive(false)
            setSearchQuery()
            searchbox.current.value = ''
        }

    }

    const handleSearch = () => {
        console.log(searchQuery);
        setActive(false)
        setSearchQuery()
        searchbox.current.value = ''
    }

    useEffect(() => {
        if (active) {
            if (previousValue.current === undefined) {
                searchbox.current.classList.add('searchbox--expand')
                previousValue.current = active
                return
            }
            searchbox.current.classList.replace('searchbox--shrink', 'searchbox--expand')
            return
        }
        if (previousValue.current === !active) {
            searchbox.current.classList.replace('searchbox--expand', 'searchbox--shrink')
            return
        }
    }, [active, previousValue])

    return (
        <>
            <Login model={model} setModel={setModel} />
            <Signup model={model} setModel={setModel} />
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
                    <span className='searchbox_wrapper' ref={searchbox_wrapper}>
                        <input onChange={(e) => setSearchQuery(e.target.value)} ref={searchbox} autoComplete='off' id='searchbox' type="text" />
                        <IconButton onClick={() => searchQuery ? handleSearch() : setActive(!active)}>
                            <SearchIcon id='search' sx={{ fontSize: 20 }} />
                        </IconButton>
                    </span>
                    <Link to='/shop' className='shop' htmlFor="">SHOP</Link>
                    {/* <Link to='/seller' className='marketplace' htmlFor="">SELL</Link> */}
                    <Badge badgeContent={userData && userData.cart ? userData.cart.length : 0} color="primary">
                        <Link to='/checkout' className='create' htmlFor="">CART</Link>
                    </Badge>
                    {
                        currentUser &&
                            currentUser ?
                            <DropDown menu={
                                <Avatar displayName={currentUser.displayName} profilePicture={currentUser.photoURL} />
                            }>
                                <Link to='/my-profile'>My Profile</Link>
                                <div onClick={() => signout()}>Logout</div>
                            </DropDown>
                            :
                            <button onClick={() => setModel({ login: true, signup: false })} className="login">LOG IN</button>
                    }
                </div>
            </div>
        </>
    )
}

export default Header
