import React, { useState, useEffect, useRef } from 'react'
import ProductRating from '../ProductRating'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating'
import './newReview.css'
import { useFirebase } from '../../../Context/FirebaseContext'
import ConfirmationDialog from '../../ConfirmationDialog/ConfirmationDialog';

function NewReview({ data, open, setOpen }) {
    const [review, setReview] = useState({ title: '', review: '' })
    const [rating, setRating] = useState()
    const [dialog, setDialog] = useState(false)
    const ratingRef = useRef()
    const { productRating, reviews, currentUser } = useFirebase()

    const box_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 5,
        outline: 'none'
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (reviews.find((doc) =>
            Object.values(doc).includes(currentUser.uid) &&
            Object.values(doc).includes(data.id)))
            return setDialog(!dialog)
        productRating(review, rating, data.id)
        setOpen(!open)
    }

    const handleRating = (value) => {
        let ratingArray = [0, 0, 0, 0, 0]
        ratingArray[value - 1] = 1
        if (!value || ratingRef.current === value) {
            ratingArray = [0, 0, 0, 0, 0]
            ratingRef.current = ''
        }
        setRating(ratingArray)
    }

    return (
        <>
            <ConfirmationDialog
                callBackAction={{
                    confirm: () => productRating(review, rating, data.id),
                    close: () => setOpen(!open)
                }}
                dialog={dialog}
                setDialog={setDialog}
                title='Already reviewed'
                message='Press CONFIRM if you want to modify existing review.' />
            <Modal
                open={open}
                onClose={() => setOpen(!open)}
            >
                <Box sx={box_style}>
                    <div className='newReview'>
                        <IconButton onClick={() => setOpen(!open)} sx={{ position: 'absolute', top: 5, right: 5 }}><CloseIcon /></IconButton>
                        <label className='newReview_customer--name' htmlFor="">Hey {data.name}</label>
                        <p>Tell us about your experience</p>
                        <img className='button_primary' src={data.image[data.defaultImage]} alt="" />
                        <label className='rate_this_product' htmlFor="">Rate this product</label>
                        <form action="submit" onSubmit={(e) => handleSubmit(e)}>
                            <Rating
                                aria-required
                                name="simple-controlled"
                                // value={rating}
                                onChange={(event, newValue) => handleRating(newValue)}
                            />
                            <TextField
                                sx={{ mt: 1 }}
                                required
                                value={review && review.title}
                                onChange={(e) => setReview(pre => ({ ...pre, title: e.target.value }))}
                                fullWidth
                                size='small'
                                id="outlined-basic"
                                label="Title"
                                variant="outlined" />
                            <TextField
                                sx={{ mt: 1 }}
                                required
                                value={review && review.review}
                                onChange={(e) => setReview(pre => ({ ...pre, review: e.target.value }))}
                                fullWidth
                                size='small'
                                id="outlined-basic"
                                rows={4}
                                multiline
                                label="Review"
                                variant="outlined" />
                            <button className='button_secondary newReview_button'>Submit your review</button>
                        </form>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default NewReview