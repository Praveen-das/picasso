import { useRef, useState } from 'react'
import './header.css'
import logo from '../../Assets/Icons/logo.png'
import { useEffect } from 'react/cjs/react.development'
import { Link } from 'react-router-dom'

function Header() {
    const [toggleHeader, setToggleHeader] = useState(false)
    const scrollValue = useRef(0)

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
                    <Link to='/products' className='shop' htmlFor="">SHOP</Link>
                    <Link to='/seller' className='marketplace' htmlFor="">SELL</Link>
                    <label className='create' htmlFor="">CREATE</label>
                    <div className="login">LOGIN</div>
                </div>
            </div>
        </>
    )
}

export default Header
