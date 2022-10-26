import Rating from '@mui/material/Rating'
import Avatar from '@mui/material/Avatar'
import react from 'react'
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
                        value={data.rating} readOnly />
                    </div>
                </div>
                <label className='review_title' htmlFor="">{data.review.title}</label>
                <p className='review'>{data.review.review}</p>
            </div>
        </>
    )
}

export default Review