import { Rating } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useFirebase } from '../../Context/FirebaseContext'

function ProductRating({ id, size }) {

    const [value, setValue] = useState(0)
    const { productRating, reviews, getAverageRating } = useFirebase()
    const [rating, setRating] = useState([])
    const ratingRef = useRef()

    useEffect(() => {
        if (!reviews) return
        setRating([])
        let ratings = reviews.map((o) => o.product_id === id && o.rating).filter((o) => o !== false)
        for (let i = 0; i < 5; i++) {
            setRating(pre => [...new Set([...pre, ratings.map((o) => o[i])])])
        }
    }, [reviews, id])

    const handleProductRating = (newValue, productId) => {
        let rating = [0, 0, 0, 0, 0]
        rating[newValue - 1] = 1
        if (!newValue || ratingRef.current === newValue) {
            rating = [0, 0, 0, 0, 0]
            ratingRef.current = ''
            productRating(rating, productId)
            return
        }
        ratingRef.current = newValue
        setValue(newValue)
        productRating(rating, productId)
    }

    useEffect(() => {
        if (rating.length > 0)
            setValue(getAverageRating(rating))
    }, [rating])
    return (
        <div className="ratingAndReview">
            <Rating
                size={size ? size : 'medium'}
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => handleProductRating(newValue, id)}
            />
            {/* <small id='reviews'>{rating.length > 0 && rating[0].length} reviews</small> */}
        </div>
    )
}

export default ProductRating