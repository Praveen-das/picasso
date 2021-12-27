import React from 'react'
import './tray.css'
import { materials } from '../../Assets/URLs/categories'

function TrayMaterials() {
    return (
        <>
            <div className="tray-material-wrapper">
                <label className='tile-title' htmlFor="">SHOP BY MATERIAL</label>
                <hr />
                <div className="tray-materials">
                    {materials.map((material, index) =>
                        <div
                            key={index}
                            className='cards materials moveup'
                            style={{ backgroundImage: `url(${material.url})` }}
                        >
                            <div>{material.type}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TrayMaterials
