import React, { useEffect } from 'react'
import './categories.css'
import { categories } from '../../Assets/URLs/categories'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';

function TrayMaterials() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        gsap.fromTo('.tile-title', { x: '100%' }, {
            scrollTrigger: {
                trigger: '.tile-title',
                start: 'top bottom',
                scrub: 1
            },
            x: '-85%'
        });
    }, [])

    return (
        <>
            <div className="category-wrapper">
                <label className='tile-title brand_title' htmlFor="">SHOP BY CATEGORIES</label>
                <div className="category-cards">
                    {categories.map((category, index) =>
                        <div
                            key={index}
                            className='cards category'
                            style={{ backgroundImage: `url(${category.url})` }}
                        >
                            <span className='category_type'>{category.type}</span>
                            <span className='category_overlay' >
                                <label htmlFor="">EXPLORE</label>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TrayMaterials
