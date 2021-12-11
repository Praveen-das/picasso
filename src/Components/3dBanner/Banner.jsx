import React, { useEffect, useState } from 'react'
import './banner.css'
import img1 from '../../Assets/Images/wall/img1.jpg'
import img2 from '../../Assets/Images/wall/img2.jpg'
import img3 from '../../Assets/Images/wall/img3.jpg'
import img4 from '../../Assets/Images/wall/img4.jpeg'
import img5 from '../../Assets/Images/wall/img5.jpg'
import img6 from '../../Assets/Images/wall/img6.jpg'
import img7 from '../../Assets/Images/wall/img7.jpeg'

function Banner() {

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
    }

    return (
        <>
            <div className="PerspectiveBanner">
                <div className="PerspectiveBanner-left">
                    <label className='pb-label'  htmlFor="">Biggest online platform for buying and selling paintings.</label>
                    <button className='shopnow-button'>Shop now</button>
                </div>
                <div className="PerspectiveBanner-right">
                    <div className="wall">
                        <div className="recent">
                        <label htmlFor="">Recent works</label>
                        </div>
                        <img className='paintings' onLoad={(e) => setWidth(e)} src={img1} alt="" />
                        <img className='paintings' onLoad={(e) => setWidth(e)} src={img2} alt="" />
                        <img className='paintings' onLoad={(e) => setWidth(e)} src={img3} alt="" />
                        <img className='paintings' onLoad={(e) => setWidth(e)} src={img4} alt="" />
                        <img className='paintings' onLoad={(e) => setWidth(e)} src={img5} alt="" />
                        <img className='paintings' onLoad={(e) => setWidth(e)} src={img6} alt="" />
                        <img className='paintings' onLoad={(e) => setWidth(e)} src={img7} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner
