import React from 'react'
import Card from '../Card/Card'
import './tray.css'

function Tray({title}) {
    return (
        <>
            <div className="tray-wrapper">
                <div className="title-wrapper">
                    <label className='tray-title' htmlFor="">{title}</label>
                    <label className='tray-more' htmlFor="">More</label>
                </div>
                <hr />
                <div className="tray">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </>
    )
}

export default Tray
