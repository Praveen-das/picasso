import React from 'react'
import './section1.css'
import createImage from '../../Assets/Icons/create.svg'
import { Link } from 'react-router-dom'

function Section1() {
    return (
        <section>
            <div className="section1-contents">
                <h1>Didn't find your painting..?</h1>
                <h4>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, temporibus. Aperiam inventore porro quia ullam commodi voluptas. Laboriosam, molestias nostrum!</h4>
                <div className="steps-wrapper">
                    <Link to='/products' className="perspective">
                        <div className='card-upload'>
                            <img src={createImage} alt="" />
                            <label htmlFor="">Create Now</label>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Section1
