import react, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating'
import './newReview.css'
import { confirmAction } from '../../ConfirmationDialog/ConfirmationDialog';
import { useStore } from '../../../Context/Store';
import { useDatabase } from '../../../Hooks/useDatabase';

function NewReview({ data, open, setOpen }) {
    const [review, setReview] = useState({ title: '', review: '' })
    const [rating, setRating] = useState(0)
    const { AddProductReview } = useDatabase()
    const currentUser = useStore(state => state.auth?.user)
    const reviews = useStore(s => s.database.reviews)


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
            Object.values(doc).includes(data.id))) {
            confirmAction(
                'Already reviewed',
                'Press CONFIRM if you want to modify existing review.',
                () => {
                    AddProductReview(review, rating, data.id)
                    setReview({ title: '', review: '' })
                    setOpen(!open)
                }
            )
            return
        }
        AddProductReview(review, rating, data.id)
        setReview({ title: '', review: '' })
        setOpen(!open)
    }

    const handleClose = () => {
        setOpen(!open)
        setReview({ title: '', review: '' })
        setRating('')
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={box_style}>
                    <div className='newReview'>
                        <IconButton
                            onClick={handleClose}
                            sx={{ position: 'absolute', top: 5, right: 5 }}>
                            <CloseIcon />
                        </IconButton>
                        <label className='newReview_customer--name' htmlFor="">Hey {data.name}</label>
                        <p>Tell us about your experience</p>
                        <img className='button_primary' src={data.image[data.defaultImage]} alt="" />
                        <label className='rate_this_product' htmlFor="">Rate this product</label>
                        <Rating
                            aria-required
                            name="simple-controlled"
                            onChange={(event, newValue) => setRating(newValue)}
                        />
                        <TextField
                            autoComplete='off'
                            sx={{ mt: 1 }}
                            required
                            value={review && review.title}
                            onChange={(e) => setReview(pre => ({ ...pre, title: e.target.value }))}
                            fullWidth
                            type='text'
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
                        <button onClick={(e) => handleSubmit(e)} className='button_secondary newReview_button'>Submit your review</button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default NewReview