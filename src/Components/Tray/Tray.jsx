import React from 'react'
import './tray.css'
import Card from '../Card/Card'
import { useProductQuery } from '../../Hooks/useProducts'

function Tray({ title, url }) {
    const { data } = useProductQuery(title, url)
    
    return (
        <>
            <div className="tray_container">
                <label className='brand_title' htmlFor="">{title}</label>
                <div className="card_container">
                    {
                        data && data[0]?.map(item => (<Card key={item.id} product={item} height={300} />))
                    }
                </div>
            </div>
        </>
    )
}

export default Tray