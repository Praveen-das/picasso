import { useRef, useState } from 'react'
import './header.css'
import logo from '../../Assets/Icons/logo.png'
import { useEffect } from 'react/cjs/react.development'
import { Link } from 'react-router-dom'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import { useFirebase } from '../../Context/FirebaseContext'
import DropDown from '../DropDown/DropDown'
import Avatar from '../Avatar/Avatar'

function Header() {
    const [toggleHeader, setToggleHeader] = useState(false)
    const [model, setModel] = useState({ login: false, signup: false })
    const scrollValue = useRef(0)

    const { currentUser, signout } = useFirebase()

    useEffect(() => {
        document.onscroll = () => {
            let scrollY = window.scrollY
            if (scrollY > scrollValue.current) {
                scrollValue.current = scrollY
                return setToggleHeader(true)
            }
            if (scrollY < scrollValue.current) {
                scrollValue.current = scrollY
                return setToggleHeader(false)
            }
        }
    }, [])

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
                            <img src={logo} alt="" />
                            <label htmlFor="logo">PICASSO.</label>
                        </span>
                    </Link>
                    <label className='catagory' htmlFor="">CATEGORY</label>
                    <div className="searchbox-wrapper">
                        <input className='searchbar' type="text" />
                    </div>
                </div>
                <div className="right">
                    <Link to='/shop' className='shop' htmlFor="">SHOP</Link>
                    <Link to='/seller' className='marketplace' htmlFor="">SELL</Link>
                    <label className='create' htmlFor="">CREATE</label>
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
