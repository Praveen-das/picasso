import React from 'react'
import Card from '../Card/Card'
import './tray.css'
import { images } from '../../Assets/URLs/ImgUrls'

function Tray() {
    
    return (
        <>
            <div className="productsTray-wrapper">
                <label className='categoryTitle' htmlFor="">Product category</label>
                
                <div className="productsTray">
                    {
                        images.map((product,index)=>{
                            // if(index === 0)
                            return <Card key={index} product={product}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Tray
