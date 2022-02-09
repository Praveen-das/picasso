import React, { useEffect, useRef } from 'react'
import './tiles.css'
import { categories } from '../../Assets/URLs/categories'

function Tray() {

    return (
        <>
            <div className="tile-wrapper">
                <label className='tile-title' htmlFor="">SHOP BY CATEGORY</label>
                <hr />
                <div className="tile-category">
                    {categories.map((category, index) =>
                        <div
                            key={index}
                            className='cards category zoom'
                            style={{ backgroundImage: `url(${category.url})` }}
                        >
                            <div>{category.type}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Tray
