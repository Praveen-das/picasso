import react, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './shop.css'
import Card from '../Card/Card'
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom'
import { useStore } from '../../Context/Store';
import { useHelper } from '../../Hooks/useHelper';
import gsap from 'gsap';
import { Skeleton } from '@mui/material';

function Shop() {
    const docs = useStore(state => state.database.allProducts)
    const [next, setNext] = useState()

    // const { query, category } = useParams()
    // const { search, searching } = useSearch('allProducts')

    // useEffect(() => {
    //     if (query) {
    //         search('allProducts', query).then(res => {
    //             if (!res) return setProducts([])
    //             setProducts(res);
    //         }) 
    //         return
    //     }
    //     if (category) {
    //         return
    //     }
    //     setProducts(data && data)
    // }, [query, category, data, search])

    // const sort = (array, method) => {
    //     if (method === 'asc')
    //         return array.sort((a, b) => {
    //             if (a < b) return -1
    //             if (a > b) return 1
    //             return 0
    //         })
    //     if (method === 'des')
    //         return array.sort((a, b) => {
    //             if (a > b) return -1
    //             if (a < b) return 1
    //             return 0
    //         })
    // }

    const getRandom = useCallback(() => {
        return (Math.random() * 5) + 4
    }, [])

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
                    docs ? docs.map((o, index) => (
                        <Card key={docs.id} product={o} height={280} />
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
            <button onClick={() => {
                docs.lastElement &&
                    setNext(docs.lastElement)
            }}>next</button>
        </div>, [docs]
    )
}

export default Shop