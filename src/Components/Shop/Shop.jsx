import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../Context/FirebaseContext'
import './shop.css'
import Card from '../Card/Card'
import Masonry from '@mui/lab/Masonry';
import { useLocation, useParams } from 'react-router-dom'

function Shop() {
    const { allProducts, searchFor } = useFirebase()
    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const { query, category } = useParams()

    useEffect(() => {
        if (query) {
            searchFor(query).then(data => {
                setProducts(data);
            })
            return
        }
        if (category) {
            const query = category.toLowerCase()
            setProducts(allProducts.filter(product => {
                return product.category === query && product
            }));
            return
        }
        setProducts(allProducts)
    }, [query, category])

    return (
        <>
            <div className="shop_products">
                {
                    category ?
                        <p className='shop_title--category' htmlFor="">{category}</p> :
                        query ?
                            products && products.length === 0 ?
                                <p className='shop_title--result' htmlFor="">Found {products && products.length} Match</p> :
                                products && products.length === 1 ?
                                    <p className='shop_title--result' htmlFor="">Found only {products && products.length} Match</p> :
                                    <p className='shop_title--result' htmlFor="">Found {products && products.length} Matches</p> :
                            <p className='shop_title--shop' htmlFor="">New modern artworks by up & comming artists</p>
                }
                <hr />
                <Masonry columns={4} spacing={3} sx={{ margin: 0 }}>
                    {
                        products?.map((product, index) =>
                            <div key={index} style={{ marginBottom: '5rem' }}>
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