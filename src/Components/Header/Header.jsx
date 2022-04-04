import { useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import Login from '../Login/Login'
import { useFirebase } from '../../Context/FirebaseContext'
import DropDown from '../DropDown/DropDown'
import Avatar from '../Avatar/Avatar'
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search'


function Header() {
    const [model, setModel] = useState(false)
    const navigate = useNavigate()

    const { currentUser, signout } = useFirebase()

    const handleSearch = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            if (!e.target.value) return
            navigate(`/search/${e.target.value}`)
        }
    }

    return (
        <>
            <Login model={model} setModel={setModel} />
            <div
                className="navbar"
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
                    <Search onKeyUp={(e) => handleSearch(e)} />
                    <Link to='/shop' className='shop' htmlFor="">SHOP</Link>
                    <Link to='/sell' className='marketplace' htmlFor="">SELL</Link>
                    {/* <Badge badgeContent={userData && userData.cart ? userData.cart.length : 0} color="primary">
                        <Link to='/checkout' className='create' htmlFor="">CART</Link>
                    </Badge> */}
                    {
                        (currentUser) ?
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
