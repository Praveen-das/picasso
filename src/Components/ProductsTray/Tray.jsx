import React from 'react'
import Card from '../Card/Card'
import './tray.css'
import { useFirebase } from '../../Context/FirebaseContext'
import Masonry from '@mui/lab/Masonry';

function Tray() {
    const { allProducts } = useFirebase()
    
    return (
        <>
            <div className="productsTray-wrapper">
                <label className='categoryTitle' htmlFor="">LATEST COLLECTIONS</label>
                <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={0.3}>
                    {
                        allProducts?.map((product, index) => {
                            return <Card key={index} product={product} />
                        })
                    }
                </Masonry>
            </div>
        </>
    )
}

export default Tray
