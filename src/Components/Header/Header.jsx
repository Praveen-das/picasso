import React from 'react'
import './header.css'
import logo from '../../Assets/Icons/logo.png'
import downarrow from '../../Assets/Icons/arrow-down.svg'

function Header() {
    return (
        <>
            <div className="navbar">

                <div className="left">
                    <span className="logo">
                        <img src={logo} alt="" />
                        <label htmlFor="logo">PICASSO.</label>
                    </span>
                    <label className='catagory' htmlFor="">CATEGORY</label>
                    <div className="searchbox-wrapper">
                        <input className='searchbar' type="text" />
                    </div>
                </div>
                <div className="right">
                    <label className='shop' htmlFor="">SHOP</label>
                    <label className='marketplace' htmlFor="">MARKET PLACE</label>
                    <label className='create' htmlFor="">CREATE</label>
                    <div className="login">LOGIN</div>
                </div>
            </div>
        </>
    )
}

export default Header
