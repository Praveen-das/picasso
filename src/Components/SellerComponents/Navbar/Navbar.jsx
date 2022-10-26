import react from 'react'
import './navbar.css'
import logo from '../../../Assets/Icons/logo.png'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faChartLine, faComments, faQuestion, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className="admin-navbar">
            <Link to='/' className="admin-logo">
                <img src={logo} alt="" />
                <label htmlFor="">Picasso.</label>
            </Link>
            <Link className='dashboard' to='/seller' htmlFor=""><Icon className='faIcon' icon={faChartLine} />Dashboard</Link>
            <Link className='products' to='/seller/products' htmlFor=""><Icon className='faIcon' icon={faCartArrowDown} />Products</Link>
            <Link className='message' to='/#' htmlFor=""><Icon className='faIcon' icon={faComments} />Message</Link>
            <Link className='help' to='/#' htmlFor=""><Icon className='faIcon' icon={faQuestion} />Help</Link>
            <Link className='account' to='/#' htmlFor=""><Icon className='faIcon' icon={faUser} />My Account</Link>
            <Link className='signout' to='/#' htmlFor=""><Icon className='faIcon' icon={faSignOutAlt} />Sign Out</Link>
        </div>
    )
}

export default Navbar
