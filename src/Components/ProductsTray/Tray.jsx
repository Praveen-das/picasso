import React, { useEffect } from 'react'
import Card from '../Card/Card'
import './tray.css'
import { Link } from 'react-router-dom';

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';

// import Swiper from '../../lib/Swiper'
// import Mousewheel from '../../lib/Swiper'
// import SwiperSlide from '../../lib/Swiper'

function Tray({ height, data, title, parent, from, to, more }) {

    useEffect(() => {
        if (!parent) return
        gsap.registerPlugin(ScrollTrigger)

        // gsap.fromTo(`.${parent} .categoryTitle`, { x: `${from}` }, {
        //     scrollTrigger: {
        //         trigger: `.${parent} .categoryTitle`,
        //         start: 'top bottom',
        //         scrub: 1
        //     },
        //     x: `${to}`
        // });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: `.${parent} .card_wrapper`,
                start: 'top 80%',
                end: 'bottom center',
                toggleActions: 'restart none none reverse',
            }
        })
        tl.from(`.${parent} .card_wrapper`, { stagger: 0.1, duration: 0.1, opacity: 0 })
    }, [from, to, parent])

    return (
        <>
            <div className="productsTray-wrapper">
                {title && <label className='categoryTitle brand_title' htmlFor="">{title}</label>}
                {/* {more && <span>
                    <Link to='/shop' className='more'>VIEW ALL</Link>
                </span>} */}
                <div className="card_container">
                    {/* <Swiper
                        slidesPerView='auto'
                        spaceBetween={20}
                        mousewheel={true}
                        modules={[Mousewheel]}
                        className="mySwiper"
                    >
                        {
                            data?.map((product, index) =>
                                <SwiperSlide key={index}>
                                    <div className="card_wrapper">
                                        <Card sx={{ height: 100, borderRadius: '10px' }} product={product} />
                                    </div>
                                </SwiperSlide>
                            )
                        }
                    </Swiper> */}
                </div>
            </div>
        </>
    )
}

export default React.memo(Tray)
