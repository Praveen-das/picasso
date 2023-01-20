import Rating from '@mui/material/Rating'
import Avatar from '@mui/material/Avatar'
import './style.css'

function Review({ review }) {
    const handleAvatar = () => {
        if (review.user?.photo)
            return { src: review.user?.photo }
        return { children: review.user?.displayName[0].toUpperCase() }
    }

    return (
        <>
            <div className="customerReview">
                <div className='customer-profile'>
                    <Avatar {...handleAvatar()} className='customer-profile--picture' alt="Remy Sharp" />
                    <div className='nameAndRating'>
                        <label htmlFor="">{review.user?.displayName}</label>
                        <Rating
                            className='customer_rating'
                            name="read-only"
                            size='small'
                            value={review.vote} readOnly />
                    </div>
                </div>
                <label className='review_title' htmlFor="">{review.review?.title}</label>
                <p className='review'>{review.review?.message}</p>
            </div>
        </>
    )
}

export default Review