import { Box, Button, Typography } from '@mui/material'
import { memo, useEffect, useState } from 'react'
import Review from './Review/Review'
import NewReview from './NewReview/NewReview'
import './reviews.css'
import useReviews from '../../Hooks/useReviews'
import useCurrentUser from '../../Hooks/useCurrentUser'
import { useNavigate } from 'react-router-dom'

function Reviews({ product }) {
  const { currentUser } = useCurrentUser()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [userReview, setUserReview] = useState()
  const { reviews: reviewData } = useReviews(product?.id)

  const [reviews] = reviewData.data || [[]]

  useEffect(() => {
    setUserReview(reviews?.find(o => o.user_id === currentUser.data?.id))
  }, [reviews, currentUser.data])

  return (
    <>
      <NewReview open={open} setOpen={setOpen} product={product && product} userReview={userReview} />
      <section aria-describedby='customer reviews' className='customer_reviews'>
        <div className="customer_reviews--label">
          <Box display='flex' alignItems='end'>
            <Typography variant='h5' fontWeight={600}>Customers&nbsp;</Typography>
            <Typography variant='h5'>Reviews({reviews?.length})</Typography>
          </Box>
          {/* {
            reviews.data?.find(({ user_id }) => user_id === currentUser?.id) ?
              <Button onClick={() => setOpen(!open)} sx={{ marginLeft: 'auto' }}>Edit review</Button>
              :
              <Button onClick={() => setOpen(!open)} sx={{ marginLeft: 'auto' }}>Write a review</Button>
          } */}
          <Button onClick={() => {
            currentUser.data ?
              setOpen(!open) :
              navigate('/login')
          }} sx={{ marginLeft: 'auto' }}>Write a review</Button>
        </div>
        <div className="review_wrapper">
          {
            !!reviews?.length &&
            reviews.map(review => (
              <Review key={review.id} review={review} />
            ))
          }
        </div>
      </section>
    </>
  )
}

export default memo(Reviews)