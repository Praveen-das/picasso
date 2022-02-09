import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './banner.css'
import img1 from '../../Assets/Images/wall/img1.jpg'
import img2 from '../../Assets/Images/wall/img2.jpg'
import img3 from '../../Assets/Images/wall/img3.jpg'
import img4 from '../../Assets/Images/wall/img4.jpeg'
import img5 from '../../Assets/Images/wall/img5.jpg'
import img6 from '../../Assets/Images/wall/img6.jpg'
import img7 from '../../Assets/Images/wall/img7.jpeg'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { Power2 } from 'gsap/all'
import Masonry from '@mui/lab/Masonry';



function Banner() {
    const images = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
    ]

    const generateRandom = (min, max) => {
        return Math.floor((Math.random() * (max - min) + min))
    }
    let random = [
        { x: generateRandom(-200, 200), y: generateRandom(-200, 200) }
    ]

    useEffect(() => {
        let tl = gsap.timeline({defaults:{ease:'power4.inOut'}})
        // tl.from('.pb-label,.pb-label2,.shopnow-button', {
        //     'clip-path': 'polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)',
        //     opacity: 0,
        //     y:50,
        //     duration: 1,
        //     stagger:0.3
        // })
        // .from('.paintings',{
        //     scale:0.8,
        //     opacity:0,
        //     duration:0.5,
        //     stagger:{
        //         from:'random',
        //         amount:0.5
        //     }
        // },"-=0.8")
    })

    return (
        <>
            <div className="PerspectiveBanner" id='banner'>
                <div className="PerspectiveBanner-left">
                    <label className='pb-label' htmlFor="">Every Purchase Will Be Made With Pleasure</label>
                    <p className='pb-label2' htmlFor="">Buy or sell your favourate paintings</p>
                    <Link to='/products' className='shopnow-button'>Shop now</Link>
                </div>
                <div className="PerspectiveBanner-right">
                    <Masonry className='asd' columns={3}>
                        {
                            images.map((image, index) =>
                                <img name='painting' className='paintings wiggle' src={image} alt="" />
                            )
                        }
                    </Masonry>
                </div>
            </div>
        </>
    )
}

export default Banner
