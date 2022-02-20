import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './banner.css'
import background from '../../Assets/Images/image1.jpg'
import image from '../../Assets/Images/pencil_drawing.png'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { Power2, random } from 'gsap/all'
import Masonry from '@mui/lab/Masonry';
import brushstroke1 from '../../Assets/Images/brushstroke1.png'
import brushstroke2 from '../../Assets/Images/brushstroke2.png'
import Card from '../Card/Card'
import { useFirebase } from '../../Context/FirebaseContext'
import arrowLeft from '../../Assets/Icons/arrowLeft.svg'

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.scss';

function Banner() {
    const { allProducts } = useFirebase()

    // useEffect(() => {
    //     let tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } })
    //     gsap.registerPlugin(ScrollTrigger)
    //     const paintings = gsap.utils.toArray('.paintings')

    //     tl.from('.pb-label,.pb-label2,.shopnow-button', {
    //         'clip-path': 'polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)',
    //         opacity: 0,
    //         y: 50,
    //         duration: 1,
    //         stagger: 0.3
    //     })
    //         .from('.paintings', {
    //             x: -500,
    //             y: -500,
    //             duration: 0.5,
    //             stagger: {
    //                 from: 'random',
    //                 amount: 0.5
    //             }
    //         }, "-=0.8")
    //     const generateRandom = (min,max) => (Math.random() * (max - min)) + min
    //     paintings.forEach((painting) => {
    //         gsap.to(painting, {
    //             x: -10,
    //             y: -10,
    //             yoyo: true,
    //             delay: generateRandom(1,2),
    //             repeat: -1,
    //             duration: 2,
    //         }, 1)
    //     })
    // .to('.paintings', {
    //     x: -5,
    //     y: -5,
    //     yoyo:true,
    //     repeat:-1,
    //     duration: 2,
    //     stagger: {
    //         from: 'random',
    //         amount: 0.2,
    //     }
    // })
    // }, [])

    // const handleHover = () => {
    //     gsap.utils.toArray(".paintings").forEach(image => {
    //         let hover = gsap.fromTo(image, {
    //             x: 0,
    //             y: 0,
    //             boxShadow: "var(--boxShadow) 15px 12px 10px 1px hsl(0, 0%, 65%)",
    //             duration: 0.2,
    //             paused: true
    //         },
    //             {
    //                 x: -10,
    //                 y: -10,
    //                 boxShadow: "var(--boxShadow) 25px 22px 10px 0px  hsl(0, 0%, 75%)",
    //                 duration: 0.2,
    //                 paused: true
    //             });
    //         image.onmouseenter = () => hover.play()
    //         image.onmouseleave = () => hover.reverse()
    //     });
    // }

    // useEffect(() => {
    //     let length = 10
    //     let boxshadow = ''
    //     for (var i = 0; i <= length; i++) {
    //         boxshadow = boxshadow + `${i}px ${i}px 0 hsl(0, 0%, ${90 - i}%),`
    //     }
    //     let body = document.getRootNode().body
    //     body.style.setProperty('--boxShadow', boxshadow)
    // })

    // useEffect(() => {
    //     let animation = gsap.timeline({ repeat: 20 })
    //     let numberOfTargets = images.length
    //     console.log(numberOfTargets);
    //     let duration = 1 //change this
    //     let pause = 0.75 // change this

    //     let stagger = duration + pause
    //     let repeatDelay = (stagger * (numberOfTargets - 1)) + pause

    //     gsap.set(".paintings", { autoAlpha: 1 })
    //     animation.from('.paintings', {
    //         y: 80, duration: duration, opacity: 0, stagger: {
    //             each: stagger,
    //             repeat: -1,
    //             repeatDelay: repeatDelay
    //         }
    //     })
    //         .to('.paintings', {
    //             y: -80, duration: duration, opacity: 0, stagger: {
    //                 each: stagger,
    //                 repeat: -1,
    //                 repeatDelay: repeatDelay
    //             }
    //         }, stagger)
    // })

    useEffect(() => {
        gsap.timeline({ repeat: -1 })
            .from('.direction img', {
                scale: 1,
                duration: 0.2,
                stagger: 0.1,
                reversed: true
            })
            .to('.direction img', {
                scale: 1.2,
                duration: 0.1,
                stagger: 0.1,
                reversed: true
            }, -0.2)
    }, [])

    return (
        <>
            <div className="Banner" id='banner'>
                <div className="Banner-left">
                    <label className='brandName letterSpacing' htmlFor="">ARTWORLD</label>
                    <label className='p1' htmlFor="">Every Purchase Will Be Made With Pleasure</label>
                    <Link to='/products' className='shopnow-button'>SHOP NOW</Link>
                </div>
                <div className="Banner-right">
                    <Swiper
                        slidesPerView={'auto'}
                        freeMode={true}
                        spaceBetween={20}
                        className="mySwiper"
                    >
                        {
                            allProducts.map((product, index) =>
                                <SwiperSlide key={index}>
                                    <Card product={product} />
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
                <span className='direction'>
                    <img src={arrowLeft} alt="" />
                    <img src={arrowLeft} alt="" />
                    <img src={arrowLeft} alt="" />
                    <img src={arrowLeft} alt="" />
                    <img src={arrowLeft} alt="" />
                </span>
            </div>
        </>
    )
}

export default Banner
