import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useFirebase } from '../../Context/FirebaseContext'
import './shop.css'
import Card from '../Card/Card'
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom'

const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function Shop() {
    const { useSearch, useDatabase } = useFirebase()
    const { data, dataLoading, next } = useDatabase('allProducts')
    const [products, setProducts] = useState([])
    const { query, category } = useParams()
    const { search, searching } = useSearch('allProducts')

    useEffect(() => {
        if (query) {
            search('allProducts', query).then(res => {
                if (!res) return setProducts([])
                setProducts(res);
            })
            return
        }
        if (category) {
            return
        }
        setProducts(data && data)
    }, [query, category, data, search])

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

    return useMemo(() =>
        <div className="shop_products">
            {console.log('rendered')}
            <div className="zxc">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
            </div>
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
            <div className="images_tray">
                {
                    !dataLoading ? products?.map((product, index) =>
                        // <div className='image_wrapper'>
                        //     <img key={index} src={product.image[0]} alt="" />
                        // </div>
                        <div className='image_wrapper' key={index} style={{ marginBottom: '5rem' }}>
                            {
                                products.length === index + 1 ?
                                    <Card product={product} lastItem /> :
                                    <Card product={product} />
                            }
                        </div>
                    ) :
                        skeleton.map((o, index) => {
                            const random = getRandom()
                            return <Box key={index} height={250} width={`calc(100% / ${random}) `} sx={{ mt: '20px', mb: '50px', flex: '1 auto' }}>
                                <Skeleton />
                                <Skeleton sx={{ my: '4px' }} width="60%" />
                                <Skeleton variant='rectangular' height={'250px'} />
                            </Box>
                        })
                }
            </div>
            <button onClick={() => next()}>next</button>
        </div>, [products, category, query, searching, dataLoading, next, getRandom]
    )
}

export default Shop