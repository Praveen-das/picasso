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

    useEffect(() => {
        let tl = gsap.timeline({ defaults: { ease: 'power4.inOut' }, onComplete: handleHover })
        gsap.registerPlugin(ScrollTrigger)
        tl.from('.pb-label,.pb-label2,.shopnow-button', {
            'clip-path': 'polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)',
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.3
        })
            .from('.paintings', {
                x: -500,
                y: -500,
                duration: 0.5,
                stagger: {
                    from: 'random',
                    amount: 0.5
                }
            }, "-=0.8")
    }, [])

    const handleHover = () => {
        gsap.utils.toArray(".paintings").forEach(image => {
            let hover = gsap.fromTo(image, {
                x: 0,
                y: 0,
                boxShadow: "var(--boxShadow) 15px 12px 10px 1px hsl(0, 0%, 65%)",
                duration: 0.2,
                paused: true
            },
                {
                    x: -10,
                    y: -10,
                    boxShadow: "var(--boxShadow) 25px 22px 10px 0px  hsl(0, 0%, 75%)",
                    duration: 0.2,
                    paused: true
                });
            image.onmouseenter = () => hover.play()
            image.onmouseleave = () => hover.reverse()
        });
    }

    useEffect(() => {
        let length = 10
        let boxshadow = ''
        for (var i = 0; i <= length; i++) {
            boxshadow = boxshadow + `${i}px ${i}px 0 hsl(0, 0%, ${90 - i}%),`
        }
        let body = document.getRootNode().body
        body.style.setProperty('--boxShadow', boxshadow)
    })

    return (
        <>
            <div className="PerspectiveBanner" id='banner'>
                <div className="PerspectiveBanner-left">
                    <span className='backdrop'></span>
                    <label className='pb-label' htmlFor="">Every Purchase Will Be Made With Pleasure</label>
                    <p className='pb-label2' htmlFor="">Buy or sell your favourate paintings</p>
                    <Link to='/products' className='shopnow-button'>Shop now</Link>
                </div>
                <div className="PerspectiveBanner-right">
                    <Masonry className='asd' columns={3} spacing={3}>
                        {
                            images.map((image, index) =>
                                <img key={index} className='paintings' src={image} alt="" />
                            )
                        }
                    </Masonry>
                </div>
            </div>
        </>
    )
}

export default Banner
