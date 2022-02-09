import React, { useCallback, useEffect } from 'react'
import Card from '../Card/Card'
import './tray.css'
import { useFirebase } from '../../Context/FirebaseContext'
import Masonry from '@mui/lab/Masonry';
import { IKContext, IKImage } from 'imagekitio-react';

function Tray() {
    const { allProducts } = useFirebase()
    const urlEndpoint = 'https://ik.imagekit.io/1q7keivsfku/'

    const CustomMasonry = useCallback(() => {
        return <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={0.3}>
            {
                allProducts?.map((product, index) => {
                    return <Card key={index} product={product} />
                })
            }
        </Masonry>
    })

    return (
        <>
            <div className="productsTray-wrapper">
                <label className='categoryTitle' htmlFor="">LATEST COLLECTIONS</label>
                <div className="card_wrapper">
                    <CustomMasonry />
                </div>
            </div>
        </>
    )
}

export default Tray
