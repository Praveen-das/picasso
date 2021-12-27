import React, { useEffect, useRef } from 'react'
import './banner.css'
import img1 from '../../Assets/Images/wall/img1.jpg'
import img2 from '../../Assets/Images/wall/img2.jpg'
import img3 from '../../Assets/Images/wall/img3.jpg'
import img4 from '../../Assets/Images/wall/img4.jpeg'
import img5 from '../../Assets/Images/wall/img5.jpg'
import img6 from '../../Assets/Images/wall/img6.jpg'
import img7 from '../../Assets/Images/wall/img7.jpeg'
import gsap from 'gsap'
import { Link } from 'react-router-dom'

function Banner() {
    const recent = useRef()

    const setWidth = (e) => {
        const clientWidth = e.target.clientWidth
        const clientHeight = e.target.clientHeight
        const aspectRatio = clientWidth / clientHeight

        if (aspectRatio > 1) {
            let imgWidth = Math.floor(Math.random() * (200 - 100) + 100)
            e.target.style.width = imgWidth + 25 + 'px'
            e.target.style.alignSelf = 'flex-start'
        }
        else {
            let imgHeight = Math.floor(Math.random() * (150 - 100) + 100)
            e.target.style.height = imgHeight + 25 + 'px'
        }
        recent.current.style.display = 'unset'
        e.target.style.display = 'unset'
    }

    const handleHover = () => {
        gsap.utils.toArray(".hover").forEach(image => {
            let hover = gsap.to(image, {
                z: 5,
                boxShadow: "10px 0px 3px 1px #00000052",
                duration: 0.5,
                paused: true
            });
            setTimeout(() => {
                image.addEventListener("mouseenter", () => hover.play());
                image.addEventListener("mouseleave", () => hover.reverse());
            }, 1500)
        });
    }

    useEffect(() => {
        gsap.timeline({
            onComplete: handleHover
        })
        gsap.from(".paintings", {
            z: 200,
            stagger: {
                from: "random",
                amount: 0.5,
            }
        }, 0.5);
        gsap.from(".recent", {
            x: -500,
            duration: 0.8
        });
        gsap.from('.PerspectiveBanner-left', {
            opacity: 0,
            duration: 0.8
        })
    })

    return (
        <>
            <div className="PerspectiveBanner">
                <div className="PerspectiveBanner-left">
                    <label className='pb-label' htmlFor="">Biggest online platform for buying and selling paintings.</label>
                    <Link to='/products' className='shopnow-button'>Shop now</Link>
                </div>
                <div className="PerspectiveBanner-right">
                    <div className="wall">
                        <div className="recent hover" ref={recent}>
                            <label htmlFor="">Recent works</label>
                        </div>
                        <img className='paintings hover' onLoad={(e) => setWidth(e)} src={img1} alt="" />
                        <img className='paintings hover' onLoad={(e) => setWidth(e)} src={img2} alt="" />
                        <img className='paintings hover' onLoad={(e) => setWidth(e)} src={img3} alt="" />
                        <img className='paintings hover' onLoad={(e) => setWidth(e)} src={img4} alt="" />
                        <img className='paintings hover' onLoad={(e) => setWidth(e)} src={img5} alt="" />
                        <img className='paintings hover' onLoad={(e) => setWidth(e)} src={img6} alt="" />
                        <img className='paintings hover' onLoad={(e) => setWidth(e)} src={img7} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner
