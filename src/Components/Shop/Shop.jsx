import react, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './shop.css'
import Card from '../Card/Card'
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom'
import { useStore } from '../../Context/Store';
import { useHelper } from '../../Hooks/useHelper';
import gsap from 'gsap';
import { Skeleton } from '@mui/material';
import { useProducts } from '../../Hooks/useProducts';

function Shop() {
    const [next, setNext] = useState()
    const docs = []
    const { products } = useProducts()
    
    const [productList, count] = products?.data || []
    // const count = products?.data[1]
    
    useEffect(() => {
        const tl = gsap.timeline()
        tl.from('.product_card', {
            opacity: 0,
            stagger: 0.1
        })
    }, [])

    const [skeleton] = useState(new Array(20).fill())

    return useMemo(() =>
        <div className="shop_products">
            {/* {
                    searching ?
                        <Skeleton height={100} /> :
                        category ?
                            <p className='shop_title--category' htmlFor="">{category}</p> :
                            query ?
                                products && products.length === 0 ?
                                    < p className='shop_title--result' htmlFor="">Found 0 Match</p> :
                                    products && products.length === 1 ?
                                        <p className='shop_title--result' htmlFor="">Found only 1 Match</p> :
                                        <p className='shop_title--result' htmlFor="">Found {products && products.length} Matches</p> :
                                <p className='shop_title--shop' htmlFor="">New modern artworks by up & comming artists</p>
                }
                <hr /> */}
            {/* <ul>
                <li>Latest</li>
                <li><div /></li>
                <li>Popular</li>
            </ul> */}
            <div className="images_tray">
                {
                    productList ? productList.map((o) => (
                        <Card key={o.id} product={o} height={280} />
                    )) :
                        skeleton.map((o, i) => (
                            <Box key={i} height={280} sx={{ mt: '20px', mb: '50px', flex: '1 auto' }}>
                                <Skeleton />
                                <Skeleton sx={{ my: '4px' }} width="60%" />
                                <Skeleton variant='rectangular' height={'250px'} />
                            </Box>
                        ))
                }
            </div>
            {/* <button onClick={() => {
                docs.lastElement &&
                    setNext(docs.lastElement)
            }}>next</button> */}
        </div>, [productList]
    )
}

export default Shop