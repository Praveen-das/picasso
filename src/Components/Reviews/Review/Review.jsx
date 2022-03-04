import Rating from '@mui/material/Rating'
import Avatar from '@mui/material/Avatar'
import React, { useEffect } from 'react'
import './style.css'

function Review({ data }) {
    const handleAvatar = () => {
        if (data.user_image)
            return { src: data.user_image }
        return { children: data.username[0].toUpperCase() }
    }

    return (
        <>
            <div className="customerReview">
                <div className='customer-profile'>
                    <Avatar {...handleAvatar()} className='customer-profile--picture' alt="Remy Sharp" />
                    <div className='nameAndRating'>
                        <label htmlFor="">{data.username}</label>
                        <Rating 
                        className='customer_rating'
                        name="read-only" 
                        size='small'
                        value={data.rating.map((o, i) => o === 1 && i + 1).filter(o => o !== false)[0]} readOnly />
                    </div>
                </div>
                <label className='review_title' htmlFor="">{data.review.title}</label>
                {/* <p className='review'>{data.review.review}</p> */}
                <p className='review'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam omnis non iste eum fuga dignissimos in! Esse doloremque inventore at!</p>
            </div>
        </>
    )
}

export default Review