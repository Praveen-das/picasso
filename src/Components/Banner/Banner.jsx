import React, { useEffect } from 'react'
import './banner.css'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import arrowLeft from '../../Assets/Icons/arrowLeft.svg'

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.min.css';
import { Mousewheel } from "swiper"
import { useAuth } from '../../Context/Store'

function Banner({ data }) {
    useEffect(() => {
        gsap.timeline({ defaults: { duration: 0.5 } })
            .from('.Banner-right,.direction', {
                opacity: 0,
                delay: 0.5
            })
            .from('.brandName,.p1,.Banner .button_primary', {
                'clipPath': 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
                y: 50,
                opacity: 0,
                stagger: 0.1
            })
    }, [])

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
                    <Link to='/shop' className='button_primary'>SHOP NOW</Link>
                </div>
                <div className="Banner-right">
                    <Swiper
                        slidesPerView='auto'
                        spaceBetween={20}
                        mousewheel={true}
                        modules={[Mousewheel]}
                        className="mySwiper"
                    >
                        {
                            data?.map((product, index) =>
                                <SwiperSlide key={index}>
                                    <div className="banner_card--wrapper">
                                        <Card product={product} />
                                    </div>
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