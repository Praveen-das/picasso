import react from 'react'
import './footer.css'
import instagram from '../../Assets/Icons/instagram.svg'
import facebook from '../../Assets/Icons/facebook.svg'
import twitter from '../../Assets/Icons/twitter.svg'

function Footer() {
    return (
        <>
            <footer>
                <div className='footer-container'>
                    <div className="list">
                        <ul>About Us
                            <li>Oil paintings</li>
                            <li>Acryplic paintings</li>
                            <li>Watercolor paintings</li>
                            <li>Illustrations</li>
                            <li>Mural paintings</li>
                            <li>Digital arts</li>
                        </ul>
                        <ul>SELL
                            <li>Oil paintings</li>
                            <li>Acryplic paintings</li>
                            <li>Watercolor paintings</li>
                            <li>Illustrations</li>
                            <li>Mural paintings</li>
                            <li>Digital arts</li>
                        </ul>
                    </div>
                    <div className="contact">
                        <ul>
                            Contact Us
                            <li htmlFor="">artworld@gmail.com</li>
                            <li htmlFor="">+1-202-555-0125</li>
                            <li>
                                <div className="follow">
                                    <img src={instagram} alt="instagram" />
                                    <img src={facebook} alt="instagram" />
                                    <img src={twitter} alt="instagram" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer2">
                    <p>Privacy Policy</p>
                    <p>Site map</p>
                    <p>© 2021 Picasso.com</p>
                </div>
            </footer>
        </>
    )
}

export default Footer
