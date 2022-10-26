import { Button } from '@mui/material'
import react, { memo, useEffect, useState } from 'react'
import Review from './Review/Review'
import NewReview from './NewReview/NewReview'
import './reviews.css'
import { useStore } from '../../Context/Store'

function Reviews({ state }) {
  const [open, setOpen] = useState(false)
  const reviews = useStore(s => s.database.reviews)

  return (
    <>
      <NewReview open={open} setOpen={setOpen} data={state} />
      <section aria-describedby='customer reviews' className='customer_reviews'>
        <div className="customer_reviews--label">
          <label className='customer_reviews--customers' htmlFor="customer">Customers</label>
          <label className='customer_reviews--reviews' htmlFor="customer">Reviews</label>
          <Button onClick={() => setOpen(!open)} sx={{ marginLeft: 'auto' }}>Write a review</Button>
        </div>
        <div className="review_wrapper">
          {
            reviews.length > 0 && reviews.map((review, index) => (
              review.product_id === state.id &&
              <Review key={index} data={review} />
            ))
          }
        </div>
      </section>
    </>
  )
}

export default memo(Reviews)