import react, { useEffect } from 'react'
import './categories.css'
import { categories } from '../../Assets/URLs/categories'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

function TrayMaterials() {
    useEffect(() => {
        // gsap.registerPlugin(ScrollTrigger)

        // gsap.fromTo('.tile-title', { x: '100%' }, {
        //     scrollTrigger: {
        //         trigger: '.tile-title',
        //         start: 'top bottom',
        //         scrub: 1
        //     },
        //     x: '-85%'
        // });
    }, [])

    return (
        <>
            <div className="category-wrapper">
                <label className='tile-title brand_title' htmlFor="">TOP CATEGORIES</label>
                <p className='category_desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo enim perspiciatis tempora delectus autem assumenda?</p>
                <div className="category-cards">
                    {
                        categories.map((category, index) =>
                            <Link
                                to={`/shop`}
                                state={{ filter: [{ item: 'category', name: category.type, value: category.id }] }}
                                key={index}
                                className='cards category'
                                style={{ backgroundImage: `url(${category.url})` }}
                            >
                                <span className='category_type'>{category.type}</span>
                                <span className='category_overlay' >
                                    <label htmlFor="">EXPLORE</label>
                                </span>
                            </Link>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default TrayMaterials
