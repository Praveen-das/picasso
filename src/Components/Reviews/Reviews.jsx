import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Review from './Review/Review'
import NewReview from './NewReview/NewReview'
import './reviews.css'
import { useFirebase } from '../../Context/FirebaseContext'
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog'

function Reviews({ state }) {
  const { reviews, currentUser } = useFirebase()
  const [open, setOpen] = useState(false)
  const [dialog, setDialog] = useState(false)

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
            reviews?.map((review, index) => (
              review.product_id === state.id &&
              <Review key={index} data={review} />
            ))
          }
        </div>
      </section>
    </>
  )
}

export default Reviews