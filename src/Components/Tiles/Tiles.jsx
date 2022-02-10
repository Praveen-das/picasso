import React, { useEffect } from 'react'
import './tiles.css'
import { categories } from '../../Assets/URLs/categories'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Power2 } from 'gsap/all'

function Tray() {

    // useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger)
    //     gsap.from('.tile-title,.category', {
    //             scrollTrigger: {
    //                 trigger: '.tile-wrapper',
    //                 start: 'top center',
    //                 end: '120% center',
    //                 toggleActions: 'play reverse play reverse',
    //             },
    //             stagger: 0.1,
    //             duration:0.1,
    //             opacity:0,
    //         })
    // },[])

    return (
        <>
            <div className="tile-wrapper">
                <label className='tile-title' htmlFor="">SHOP BY CATEGORY</label>
                <hr />
                <div className="tile-category">
                    {categories.map((category, index) =>
                        <div
                            key={index}
                            className='cards category'
                        >
                            <div>{category.type}</div>
                            <img className='category_image zoom' src={category.url} alt="" />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Tray
