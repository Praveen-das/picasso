import { useEffect } from 'react'
import './banner.css'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.min.css';
import { Mousewheel } from "swiper"
import Section from '../Devices/Section/Section'
import { useProducts } from '../../Hooks/useProducts'

function Banner() {
    const { data } = useProducts()

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.2 } })
        tl.from('.Banner-right', {
            delay: 0.2,
            opacity: 0
        }).from('.brandName,.p1,.Banner .button_primary', {
            'clipPath': 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
            y: 50,
            opacity: 0,
            stagger: 0.1
        })
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
                        breakpoints={{
                            // 425: {
                            //     spaceBetween: 20
                            // },
                            320: {
                                spaceBetween: 10
                            },
                        }}
                        mousewheel={true}
                        modules={[Mousewheel]}
                        className="mySwiper"
                    >
                        {
                            data && data[0]?.map((product, index) =>
                                <SwiperSlide key={index}>
                                    {/* <div className="banner_card--wrapper"> */}
                                    <Card product={product} height={400} />
                                    {/* </div> */}
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
            </div>
            {/* <Section /> */}
        </>
    )
}

export default Banner