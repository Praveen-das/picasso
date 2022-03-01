import React, { useEffect } from 'react'
import './aboutus.css'
import gsap from 'gsap'
import scrollTrigger from 'gsap/ScrollTrigger'

function AboutUs() {

    useEffect(() => {
        gsap.registerPlugin(scrollTrigger)
        gsap.timeline({
            scrollTrigger: {
                trigger: '.aboutus_label,.aboutus_p,.aboutus_button',
                start: 'bottom bottom',
                toggleActions: 'restart none none reverse'
            }
        }).from('.aboutus_label,.aboutus_p,.aboutus_button', {
            stagger: 0.2,
            opacity: 0,
            duration: 0.2
        })
    }, [])

    return (
        <>
            <hr />
            <section className='aboutus'>
                <label className='aboutus_label letterSpacing' htmlFor="">ABOUT US</label>
                <p className='aboutus_p'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae aperiam delectus doloremque, minima eaque quis!</p>
                <button className='aboutus_button button_primary'>READ ABOUT US</button>
            </section>
        </>
    )
}

export default AboutUs