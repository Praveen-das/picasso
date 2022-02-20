// import React, { useCallback, useEffect } from 'react'
// import Card from '../Card/Card'
// import './tray.css'
// import { useFirebase } from '../../Context/FirebaseContext'
// import Masonry from '@mui/lab/Masonry';
// import { IKContext, IKImage } from 'imagekitio-react';
// import gsap from 'gsap'

// import 'swiper/swiper.min.css'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import ScrollTrigger from 'gsap/ScrollTrigger';
// import { Link } from 'react-router-dom';

// function Tray({ title, parent, from,to }) {
//     const { allProducts } = useFirebase()
//     useEffect(() => {
//         if (!parent) return
//         gsap.registerPlugin(ScrollTrigger)

//         gsap.fromTo(`.${parent} .categoryTitle`,{x:`${from}`},{
//             scrollTrigger: {
//                 trigger: `.${parent} .categoryTitle`,
//                 start: 'top bottom%',
//                 scrub: 1,
//             },
//             x: `${to}`
//         });

//         const tl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: `.${parent} .card_wrapper`,
//                 start: 'top 80%',
//                 end: 'bottom center',
//                 toggleActions: 'restart none none reverse',
//             }
//         })
//         tl.from(`.${parent} .card_wrapper`, {stagger: 0.1, opacity:0})
//     }, [])

//     return (
//         <>
//             <div className="productsTray-wrapper">
//                 <label className='categoryTitle' htmlFor="">{title}</label>
//                 <Link to='/#'><label className='more' htmlFor="">VIEW ALL</label></Link>
//                 <div className="card_container">
//                     <Swiper
//                         slidesPerView='auto'
//                         freeMode={true}
//                         spaceBetween={20}
//                         className="mySwiper"
//                     >
//                         {
//                             allProducts?.map((product, index) =>
//                                 <SwiperSlide key={index}>
//                                     <div className="card_wrapper">
//                                         <Card product={product} />
//                                     </div>
//                                 </SwiperSlide>
//                             )
//                         }
//                     </Swiper>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Tray
