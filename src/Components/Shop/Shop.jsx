import React, { useEffect } from 'react'
import { useFirebase } from '../../Context/FirebaseContext'
import './shop.css'
import Card from '../Card/Card'
import favourite_normal from '../../Assets/Icons/favourite-normal.svg'
import favourite_active from '../../Assets/Icons/favourite-active.svg'
import Masonry from '@mui/lab/Masonry';

function Shop() {
    const { allProducts, userData, addToWishlist, removeFromWishlist } = useFirebase()
    return (
        <>
            <div className="shop_products">
                <p htmlFor="">New modern artworks by up & comming artists</p>
                {/* <span className='caption_card'>
                    </span> */}
                <hr />
                <Masonry columns={4} spacing={5} sx={{ margin: 0 }}>
                    {
                        allProducts?.map((product, index) =>
                            <div key={index} style={{marginBottom:'5rem'}}>
                                <Card product={product} />
                            </div>
                        )
                    }
                </Masonry>
            </div>
        </>
    )
}

export default Shop